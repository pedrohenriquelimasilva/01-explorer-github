const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production', //instancia para ambiente de desenvolvimento
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', //ele vai mostrar o codigo na hr de debugar e achar erros
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //arquivo principal da execução
  output: {
    path: path.resolve(__dirname, 'dist'), //saida de dados das execuções
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] //aceirtar os tipos de extenções
  },
  devServer: {
    static: path.resolve(__dirname, 'public'), //server que o webpack possibilita para manter a aplicação no ar e atualizada automaticamente
    hot: true,
  },
  plugins:[
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new htmlWebpackPlugin({ //adição dinamica da pagina com o script react dentro e modificado para todos os browser
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {
    rules: [ //rotas que o webpack vai fazer para converter 
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options: {
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'] //esses louder vão fazer a conversão para colocar na pagina criada
      }
    ]
  }
}