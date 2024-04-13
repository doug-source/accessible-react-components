/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.svg': '<rootDir>/__mocks__/svgMock.tsx',
    },
};
