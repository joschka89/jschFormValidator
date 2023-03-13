/* joschka scriptbank*/

 function jschInputCheck(e,id) { 
    obj=document.getElementById(id);
    e.preventDefault();
    
    var children=obj.children;
    for (var i = 0; i < children.length; i++) {
      if(children[i].control) {
        var childId = children[i].control.attributes[1].value;     
        if(children[i].control.attributes['checkrules']) {
            var childCheckRules = children[i].control.attributes['checkrules'].value;
            var childCheckRuleArr=childCheckRules.split(' ');
            for(var childCheckRule of childCheckRuleArr) {
              console.log(childCheckRule);
              jschCheckRules(childCheckRule,childId);
            }
        }
                      
      }

    }    
 }

 function jschCheckRules(rule,id) {
    
    
    var ruleArr=rule.split('-');
    if(ruleArr[0]) {
      rule=ruleArr[0];
    }
    console.log(rule);
    switch(rule) {
        default: rule='free';break;
        case 'notempty': jschNotEmpty(id);break;
        case 'min': jschMinRule(id,ruleArr[1]); break;
        case 'max': jschMaxRule(id,ruleArr[1]);break;
    } 

    return rule;
 }

 function jschNotEmpty(id) {
  if(document.getElementById(id).value.length == '') {
    jschGetFocus(id);
    jschGetMessage('Mező Kötelezően kitöltendő!');
  }
 } 

 function jschMinRule(id,value) {
  if(document.getElementById(id).value.length < value) {
    jschGetFocus(id);
    jschGetMessage('Nem lehet kisebb mint '+value+'.');
  }
 }

 function jschMaxRule(id,value) {
  if(document.getElementById(id).value.length > value) {
    jschGetFocus(id);
    jschGetMessage('Nem lehet nagyobb mint '+value+'.');
  }
 }

 function jschGetFocus(id) {
    document.getElementById(id).focus();
 }

 function jschGetMessage(message) {
  alert(message);
 }


