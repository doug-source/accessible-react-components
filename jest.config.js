/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.svg\\?react': '<rootDir>/__mocks__/svgMock.tsx',
        '^.+\\.module\\.(css|less|scss)$': 'identity-obj-proxy',
    },
};
