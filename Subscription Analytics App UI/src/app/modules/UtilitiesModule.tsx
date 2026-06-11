import { MobileContainer } from '../components/MobileContainer';
import { Zap } from 'lucide-react';

export function UtilitiesModule() {
  return (
    <MobileContainer>
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleDrawer'))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-semibold">Utilities</h1>
        </div>
        <p className="text-blue-100 text-sm mt-1 ml-14">Track electricity, water, gas bills</p>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-gray-900 font-bold text-xl mb-2">Utilities Module</h2>
          <p className="text-gray-500 mb-4">Monitor and manage utility bills & recurring charges</p>
          <p className="text-sm text-gray-400">Coming soon...</p>
        </div>
      </div>
    </MobileContainer>
  );
}
