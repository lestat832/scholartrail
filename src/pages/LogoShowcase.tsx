import React from 'react';
import Logo from '../components/Logo';

const LogoShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-vault-blue mb-8">ScholarTrail Logo Variations</h1>
        
        {/* Full Logos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Full Logo (Vertical)</h2>
          <div className="flex flex-wrap gap-8 items-end">
            <div className="text-center">
              <Logo variant="full" size="sm" />
              <p className="mt-2 text-sm text-gray-600">Small</p>
            </div>
            <div className="text-center">
              <Logo variant="full" size="md" />
              <p className="mt-2 text-sm text-gray-600">Medium</p>
            </div>
            <div className="text-center">
              <Logo variant="full" size="lg" />
              <p className="mt-2 text-sm text-gray-600">Large</p>
            </div>
            <div className="text-center">
              <Logo variant="full" size="xl" />
              <p className="mt-2 text-sm text-gray-600">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Horizontal Logos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Horizontal Logo</h2>
          <div className="space-y-4">
            <Logo variant="horizontal" size="sm" />
            <Logo variant="horizontal" size="md" />
            <Logo variant="horizontal" size="lg" />
            <Logo variant="horizontal" size="xl" />
          </div>
        </section>

        {/* Icon Only */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Icon Only</h2>
          <div className="flex gap-4 items-center">
            <Logo variant="icon-only" size={32} />
            <Logo variant="icon-only" size={48} />
            <Logo variant="icon-only" size={64} />
            <Logo variant="icon-only" size={96} />
          </div>
        </section>

        {/* Color Schemes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Color Schemes</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Default Colors</h3>
              <div className="bg-white p-6 rounded-lg">
                <Logo variant="horizontal" size="lg" colorScheme="default" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Monochrome</h3>
              <div className="bg-white p-6 rounded-lg">
                <Logo variant="horizontal" size="lg" colorScheme="monochrome" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">White (for dark backgrounds)</h3>
              <div className="bg-vault-blue p-6 rounded-lg">
                <Logo variant="horizontal" size="lg" colorScheme="white" />
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Header Navigation</p>
              <div className="flex items-center justify-between">
                <Logo variant="horizontal" size="sm" />
                <div className="flex gap-4">
                  <span className="text-gray-600">About</span>
                  <span className="text-gray-600">Contact</span>
                </div>
              </div>
            </div>
            
            <div className="bg-vault-blue p-8 rounded-lg text-center">
              <p className="text-white mb-4">Footer Usage</p>
              <Logo variant="full" size="md" colorScheme="white" />
            </div>
            
            <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
              <p className="text-sm text-gray-600 mb-2">Favicon/App Icon</p>
              <Logo variant="icon-only" size={32} />
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Logo Guidelines</h2>
          <div className="bg-white p-6 rounded-lg">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-privacy-teal mr-2">•</span>
                <span>Minimum size: 32px for icon-only, 100px for horizontal</span>
              </li>
              <li className="flex items-start">
                <span className="text-privacy-teal mr-2">•</span>
                <span>Clear space: Maintain space equal to the star height around the logo</span>
              </li>
              <li className="flex items-start">
                <span className="text-privacy-teal mr-2">•</span>
                <span>Use white version on dark backgrounds for proper contrast</span>
              </li>
              <li className="flex items-start">
                <span className="text-privacy-teal mr-2">•</span>
                <span>Icon-only version recommended for mobile headers and app icons</span>
              </li>
              <li className="flex items-start">
                <span className="text-privacy-teal mr-2">•</span>
                <span>Do not alter colors, proportions, or add effects</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogoShowcase;