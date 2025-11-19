'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { CognipeerWebchat } from '@cognipeer/sdk';
import type { ClientTool } from '@cognipeer/sdk';
import { FiCheck, FiX, FiInfo, FiMaximize2 } from 'react-icons/fi';
import { usePersistedHookId } from '@/hooks/usePersistedHookId';

export default function WebchatWidgetPage() {
  const [hookId, setHookId] = usePersistedHookId();
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [buttonColor, setButtonColor] = useState('#14b8a6');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');
  const [widgetInstance, setWidgetInstance] = useState<any>(null);
  const [enableTools, setEnableTools] = useState(true);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (widgetInstance) {
        widgetInstance.destroy();
      }
    };
  }, [widgetInstance]);

  // Define client tools
  const clientTools: ClientTool[] = [
    {
      name: 'get_current_time',
      description: 'Get the current date and time',
      parameters: {
        type: 'object',
        properties: {
         
        },
      },
      execute: async () => {
        return new Date().toLocaleString();
      }
    },
    {
      name: 'calculate',
      description: 'Perform a simple mathematical calculation',
      parameters: {
        type: 'object',
        properties: {
          expression: {
            type: 'string',
            description: 'Mathematical expression (e.g., "2 + 2")'
          }
        },
        required: ['expression']
      },
      execute: async (args: Record<string, any>) => {
        try {
          const expression = args.expression as string;
          const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, '');
          const result = Function('"use strict"; return (' + sanitized + ')')();
          return `${expression} = ${result}`;
        } catch (error: any) {
          throw new Error(`Calculation failed: ${error.message}`);
        }
      }
    }
  ];

  const handleMount = () => {
    if (!hookId.trim()) {
      setError('Please enter a Hook ID');
      return;
    }

    try {
      setError('');

      // Create widget with optional client tools
      const widget = CognipeerWebchat.createWidget({
        hookId: hookId,
        baseUrl: process.env.NEXT_PUBLIC_COGNIPEER_BASE_URL || 'https://app.cognipeer.com',
        position: position,
        buttonColor: buttonColor,
        theme: {
          primary: buttonColor,
          headerBG: '#ffffff',
          mainBG: '#f9fafb'
        },
        tools: enableTools ? clientTools : undefined
      });

      // Listen to tool calls
      if (enableTools) {
        widget.on('tool-call', (event: any) => {
          console.log('[Widget] Tool called:', event.data);
        });
      }

      setWidgetInstance(widget);
      setMounted(true);
    } catch (err: any) {
      setError(`Failed to create widget: ${err.message}`);
      setMounted(false);
      console.error('Widget creation error:', err);
    }
  };

  const handleUnmount = () => {
    if (widgetInstance) {
      widgetInstance.destroy();
      setWidgetInstance(null);
    }
    setMounted(false);
  };

  const handleOpenWidget = () => {
    if (widgetInstance) {
      widgetInstance.open();
    }
  };

  const handleCloseWidget = () => {
    if (widgetInstance) {
      widgetInstance.close();
    }
  };

  return (
    <main className="h-full flex flex-col bg-gray-50">
      <Header />

      <Navigation />

        <div className="flex-grow overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Webchat Floating Widget</h1>
              <p className="text-gray-600">
                Add a floating chat button to your website (like Intercom or Drift)
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FiInfo className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">About Floating Widgets:</p>
                  <p>
                    The widget appears as a floating button on your page. Users can click it to open the chat window.
                    Perfect for customer support, lead generation, and user engagement.
                  </p>
                  {enableTools && (
                    <p className="mt-2">
                      <strong>Client Tools Enabled:</strong> The AI can call <code className="bg-blue-100 px-1 rounded">get_current_time</code> and <code className="bg-blue-100 px-1 rounded">calculate</code> functions in your browser!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hook ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={hookId}
                    onChange={(e) => setHookId(e.target.value)}
                    placeholder="Enter your Hook ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={mounted}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={mounted}
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Color
                  </label>
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    disabled={mounted}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={enableTools}
                      onChange={(e) => setEnableTools(e.target.checked)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      disabled={mounted}
                    />
                    Enable Client Tools
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Allow AI to call browser functions
                  </p>
                </div>
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600">{error}</p>
              )}

              <div className="flex gap-3 flex-wrap">
                {!mounted ? (
                  <button
                    onClick={handleMount}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    <FiCheck size={18} />
                    Create Widget
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleOpenWidget}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FiMaximize2 size={18} />
                      Open
                    </button>
                    <button
                      onClick={handleCloseWidget}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <FiX size={18} />
                      Close
                    </button>
                    <button
                      onClick={handleUnmount}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FiX size={18} />
                      Destroy Widget
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Code Example */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Example</h2>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { CognipeerWebchat } from '@cognipeer/sdk';

const widget = CognipeerWebchat.createWidget({
  hookId: '${hookId || 'your-hook-id'}',
  position: '${position}',
  buttonColor: '${buttonColor}',
  theme: {
    primary: '${buttonColor}',
    headerBG: '#ffffff',
    mainBG: '#f9fafb'
  }
});

// Programmatic control
widget.open();
widget.close();
widget.destroy();`}</code>
              </pre>
            </div>

            {/* Preview Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h2>
              {mounted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-900">
                    <span className="font-semibold">Widget is active!</span> Look for the floating button in the <span className="font-mono">{position}</span> corner of your screen.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600">
                    Configure and create the widget to see it in action
                  </p>
                </div>
              )}
            </div>
        </div>
      </div>
    </main>
  );
}