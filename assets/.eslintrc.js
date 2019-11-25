module.exports =  {
    parser:  <% if(locals.typescript){ %>'@typescript-eslint/parser'<% } else if(locals.babel) { %>'babel-eslint'<% } else { %> 'esprima' <% } %>,  // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        <%_ if(locals.react){ _%>
        jsx: true
        <%_ } _%>  
      },
    },
    extends:  [
      <% if(locals.react){ _%>'airbnb'<%_ } else { _%>'airbnb-base'<%_ } _%>,  // Uses airbnb, it including the react rule(eslint-plugin-react/eslint-plugin-jsx-a11y)
      <%_ if(locals.typescript){ _%>
      'plugin:@typescript-eslint/recommended', // Optional enable, will more stricter
      <%_ } _%>  
      <%_ if(locals.typescript){ _%>
      'plugin:import/typescript', // Use prettier/react to pretty react syntax
      <%_ } _%>
      'plugin:promise/recommended',
      // 'plugin:prettier/recommended',
      // 'prettier/@typescript-eslint'
    ],
    settings: {
      'import/parsers': {
        <%_ if(locals.typescript){ _%>
        '@typescript-eslint/parser': ['.ts', '.tsx']
        <%_ } _%>  
      },
      'import/resolver': {
        <%_ if(locals.typescript){ _%>
        // use <root>/path/to/folder/tsconfig.json
        typescript: {
          directory: './tsconfig.json'
        },
        <%_ } _%>  
        <%_ if(locals.react || locals.webpack){ _%>
        webpack: {
          config: './webpack.config.js'
        }
        <%_ } _%>  
      }
    },
    env: {
      browser: true, // enable all browser global variables
      commonjs: true,
      es6: true,
      jest: true,
      node: true
    },
    plugins: [<% if(locals.typescript) { %>'@typescript-eslint', <% } %><% if(locals.react) { %>'react-hooks', <% } %>'promise'],
    rules:  {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
      'no-useless-constructor': 0,
      'no-console': 0,
      'class-methods-use-this': 0,
      'indent': ['error', 4],
      'func-names': 0,
      'no-unused-expressions': 0,
      'no-plusplus': 0,
      'import/prefer-default-export': 0,
      'no-param-reassign': 0,
      'max-len': ['error', {
        'code': 120,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true
      }],
      'consistent-return': 0,
      <%_ if(locals.react){ _%>
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'react/jsx-filename-extension': [1, { 'extensions': [<% if(locals.typescript) { %>'.ts', '.tsx', <% } %>'.js', '.jsx'] }],
      'react/jsx-one-expression-per-line': 0,
      'react-hooks/rules-of-hooks': 'error',


      <%_ } _%>  
      <%_ if(locals.typescript){ _%>


      /**
       * @description rules of @typescript-eslint
       */
      '@typescript-eslint/prefer-interface': 'off', // also want to use 'type'
      '@typescript-eslint/explicit-function-return-type': 'off', // annoying to force return type
      '@typescript-eslint/indent': ['error', 4], // avoid conflict with airbn
      '@typescript-eslint/no-explicit-any': 'off'
      <%_ } _%>  


      /**
       * @description rules of eslint-plugin-prettier
       */
      // 'prettier/prettier': [
      //   error, {
      //     singleQuote: true,
      //     semi: false
      //   }
      // ]
    },
  };
  