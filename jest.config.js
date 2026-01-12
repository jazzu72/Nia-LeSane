module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@screens/(.*)$': '<rootDir>/src/screens/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        '^@tests/(.*)$': '<rootDir>/src/tests/$1'
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/tests/**',
        '!src/**/*.test.{ts,tsx}'
    ],
    coverageThresholds: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    testMatch: [
        '**/__tests__/**/*.{ts,tsx}',
        '**/*.test.{ts,tsx}'
    ],
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react'
            }
        }
    }
};
