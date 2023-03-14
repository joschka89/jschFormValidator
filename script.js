/* joschka scriptbank*/

 function jschInputCheck(e,id) { 
    obj=document.getElementById(id);

    var children=obj.children;
    const message=[''];
    for (var i = 0; i < children.length; i++) {      
      if(children[i].control) {
        var childId = children[i].control.attributes[1].value;     
        if(children[i].control.attributes['checkrules']) {
            var childCheckRules = children[i].control.attributes['checkrules'].value;
            var childCheckRuleArr=childCheckRules.split(' ');
            var a=0;                     
            for(var childCheckRule of childCheckRuleArr) {            
              var uzenetek=jschCheckRules(e,childCheckRule,childId);
              message.push(uzenetek);
              a++;
            }           
        }                   
      }
    }
    jschGetMessage(message);      
 }

 function jschCheckRules(e,rule,id) {
     
    var ruleArr=rule.split('-');
    if(ruleArr[0]) {
      rule=ruleArr[0];
    }
    var message='';
    switch(rule) {
        default: rule='free';break;
        case 'notempty': message=jschNotEmpty(e,id);break;
        case 'min': message=jschMinRule(e,id,ruleArr[1]); break;
        case 'max': message=jschMaxRule(e,id,ruleArr[1]);break;
    } 
    return message;
 }

 function jschNotEmpty(e,id) {
  if(document.getElementById(id).value.length == '') {
    e.preventDefault();
    jschGetFocus(id);
    return 'Mező Kötelezően kitöltendő!';
  } else {
    return '';
  }   
 } 

 function jschMinRule(e,id,value) {
  if(document.getElementById(id).value.length < value) {
    e.preventDefault();
    jschGetFocus(id);
    return 'Mező nem lehet kisebb, mint '+value;
  } else {
    return '';
  }
 }

 function jschMaxRule(e,id,value) {
  if(document.getElementById(id).value.length > value) {
    e.preventDefault();
    jschGetFocus(id);
    return 'Mező nem lehet nagyobb, mint '+value;
  } else {
    return '';
  }
 }

 function jschGetFocus(id) { 
    document.getElementById(id).focus();
 }

 function jschGetMessage(message) {
  jschRenderModal(message);
  console.log(message);
 }



function jschRenderModal(message) {  
    var str='';
    console.log(message);
    for (var mess of message) {
      str+=mess+'<br>';
    }

    if(document.getElementById('myModal')) {
      document.getElementById('myModal').style.display='inherit';
      return;
    }
  
    var div = document.createElement("div");
    var createdDiv=document.body.appendChild(div);
    createdDiv.innerHTML+=`<div id="myModal" class="modal">
                            <div class="modal-content">
                              <span class="close">&times;</span>
                              <p>${str}</p>
                            </div>
                          </div>`; 

    document.getElementById("myModal").onclick = function() {
      jschClose();
    }                          
}     

function jschClose() {           
  var node=document.getElementById('myModal');
  node.style.display ='none';  
}   

