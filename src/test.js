

data = [{id: 1203, name: 'natalie'},{id: 1203, name: 'natise'},{id: 12033, name: 'natrstst3lie'}]

function deleteDuplicate(userList) {
  var ids = [];
  userList.forEach(function(user) {
      ids.push(user.id);
  });

  
var uniq = ids.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
  return uniq
  }

  console.log(deleteDuplicate(data));