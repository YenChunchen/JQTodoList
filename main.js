$(document).ready(function() {
var mydb =new Firebase('https://myfirebase-13824.firebaseio.com/list');  //連結至db
var orilist=[];
var list=orilist;  //存放項目
var temp;  //暫存每次todo物件
var doing;  //todo欄位名稱
var input =$('input[name=text]').val();   //input value
//---------------------------------
function todo(input){    //create todo class
  this.doing=input;
}
//--------------------------------------------------------/
//-------------------------------------------------------
mydb.once('value',function(mydb){  //show  intial
   for(var n in mydb.val()){
     console.log(mydb.child(n+'/doing').val()+"====");
     var item=mydb.child(n+'/doing').val();
     console.log(typeof item);
     var item2=new todo(item);
     list.push(item2);
     $('ol').append('<div><li>'+item+'</li><span class="edit">Edit</span></div>');
   }
});
/*---------------------------------------------
var mydb=firebase.database().ref().child('list');   //show  intial
mydb.once('value',function(snap){
   snap.forEach(function(childsnap){
     var it=childsnap.val();
     $('ol').append('<div><li>'+it+'</li><span class="edit">Edit</span></div>');
     var item = new todo(it);
     list.push(item);
   });
   console.log(typeof list[0]);
});
//-----------------------------------------------------------*/
  $(document).on('click','.add',function(){   //add to db
    var input =$('input[name=text]').val();
    if(input===' ') return false;
    if(input!=='')
      {
        temp=new todo(input);
        list.push(temp);
        mydb.set(list);
        $('ol').append('<div><li>'+input+'</li><span class="edit">Edit</span></div>');
      }
      $(this).closest('.header').find('input').val('');
  });
  //------------------------------------
  $(document).on('click','li', function(){  //cross
    $(this).toggleClass('tocls1');
    // var i = $("ol li").index(this);  //find current obj index
    // alert(i);
  });
  //---------------------------------------------
  $(document).on('dblclick','li', function(){   //remove from db
    var i = $("ol li").index(this);  //find current obj index
    alert(i);
    list[i]=null;
    mydb.set(list);
    $(this).closest('div').hide();
  });
  //-------------------------
  $(document).on('click','.edit',function(){    //edit from db
      var str= $(this).closest('div').find('li').text();
      $(this).closest('div').find('li').after('<input type="text2" name="text2">');
      $(this).closest('div').find('li').remove();
      var i = $("ol span").index(this);  //find current obj index
      $('input').keydown(function(keyinnn){
        switch(parseInt(keyinnn.which))  //將鍵盤輸入值轉為int
        {
          case 13:var e=$('input[name=text2]').val();   //press enter
                  if(e===' ') return false;
                  temp=new todo(e);
                  list[i]=temp;
                  mydb.set(list);
                  $(this).closest('div').find('input').after('<li>'+e+'</li>');
                  $(this).closest('div').find('input[name=text2]').remove();
                  break;
          case 27:   //press esc
                  $(this).closest('div').find('input').after('<li>'+str+'</li>');
                  $(this).closest('div').find('input[name=text2]').remove();
                  break;
          default:break;
      }
      });
      //------------------------
    });
    $('ol').sortable();  //拖曳排序
  //-----------------------------/
});
