const FUNCS = ["map", "forEach"];

function checkName(path) {
  return path.node.callee.property && FUNCS.indexOf(path.node.callee.property.name) > -1;
}

export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      CallExpression(path) {
        var parent = path.getStatementParent();
        if (checkName(path)) {
          var name = path.node.callee.property.name;
          
          var arrayName = path.scope.generateUidIdentifier("a");
          var funcName = path.scope.generateUidIdentifier("f");
          var resArrName = path.scope.generateUidIdentifier("r");
          
          var iterator = path.scope.generateUidIdentifier("i");

          var call = t.callExpression(
            funcName,
            [
              t.memberExpression(
                arrayName,
                iterator,
                true
              ),
              iterator,
              arrayName
            ]
          );
          
          var resArray = name === "forEach" ? [] : [t.variableDeclaration(
            "var",
            [
              t.variableDeclarator(
                resArrName,
                t.arrayExpression()
              )
            ]
          )];
          
          var expr = t.callExpression(
            t.memberExpression(
              t.memberExpression(
                arrayName,
              	iterator,
              	true
              ),
              t.identifier("push")
            ),
            [ call ]
          );
          
          path.getStatementParent().insertBefore([
            t.variableDeclaration(
              "var",
              [
                t.variableDeclarator(
                  arrayName,
                  path.node.callee.object
                )
              ]
            ),
            
            t.variableDeclaration(
              "var",
              [
                t.variableDeclarator(
                  funcName,
                  path.node.arguments[0]
                )
              ]
            ),
            
            ...resArray,
            
            t.forStatement(
              t.variableDeclaration(
                "var",
                [
                  t.variableDeclarator(
                    iterator,
                    t.numericLiteral(0)
                  )
                ]
              ),
              t.binaryExpression(
                '<',
                iterator,
                t.memberExpression(
                  arrayName,
                  t.identifier('length')
                )
              ),
              t.updateExpression(
                '++',
                iterator
              ),
              t.expressionStatement(
                name === "forEach" ? call : expr
              )
            )
          ]);
          
          path.replaceWith(name === "forEach" ? t.identifier("undefined") : resArrName);
        }
      }
    }
  };
}

