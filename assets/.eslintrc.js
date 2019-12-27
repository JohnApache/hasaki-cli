module.exports =  {
    parser:  <% if(locals.typescript){ %>'@typescript-eslint/parser'<% } else if(locals.babel || locals.react) { %>'babel-eslint'<% } else { %> 'esprima' <% } %>,  // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        <%_ if(locals.react){ _%>
        jsx: true
        <%_ } _%>  
      },
    },
    env: {
      browser: true, // enable all browser global variables
      commonjs: true,
      es6: true,
      jest: true,
      node: true
    },
    settings: {
      <%_ if(locals.typescript){ _%>
      'import/parser': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      <%_ } _%>  
      <%_ if(locals.typescript || locals.react){ _%>
      'import/resolver': {
        <%_ if(locals.typescript){ _%>
        typescript: {
          directory: './tsconfig.json'
        },
        <%_ } _%> 
        <%_ if(locals.react){ _%>
        webpack: {
          config: './webpack.config.js'
        },
        <%_ } _%> 
      }  
      <%_ } _%> 
    },
    extends:  [
      <%_ if(!locals.typescript && !locals.react){ _%>
      '@dking/base'
      <%_ } _%>  
      <%_ if(locals.typescript && !locals.react){ _%>
      '@dking/typescript'
      <%_ } _%>  
      <%_ if(!locals.typescript && locals.react){ _%>
      '@dking/react'
      <%_ } _%>  
      <%_ if(locals.typescript && locals.react){ _%>
      '@dking/typescript-react'
      <%_ } _%>  
    ],
    rules:  {},
  };
  