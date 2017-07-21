$(document).ready(function() {
var mydb =new Firebase('https://myfirebase-13824.firebaseio.com/list');  //連結至db
var orilist=[];
var list=orilist;  //存放項目
var temp;
var input =$('input[name=text]').val();
function todo(input){    //create todo class
  this.doing=input;
}
//-----------------------------------------------------------
  $(document).on('click','.add',function(){   //add to db
    var input =$('input[name=text]').val();
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
  });
  //---------------------------------------------
  $(document).on('dblclick','li', function(){   //remove from db
    var i = $("ol li").index(this);  //find current obj index
    list[i]=null;
    mydb.set(list);
    // $(this).closest('div').remove();
  });
  //-------------------------
  $(document).on('click','.edit',function(){    //edit from db
      $(this).closest('div').find('li').after('<input type="text2" name="text2">');
      $(this).closest('div').find('li').remove();
      var i = $("ol span").index(this);  //find current obj index
      $('input').keydown(function(keyinnn){
        switch(parseInt(keyinnn.which))  //將鍵盤輸入值轉為int
        {
          case 13:var e=$('input[name=text2]').val();   //確定按下enter
                  temp=new todo(e);
                  list[i]=temp;
                  mydb.set(list);
                  $(this).closest('div').find('input').after('<li>'+e+'</li>');
                  $(this).closest('div').find('input[name=text2]').remove();
                  break;
          default:break;
      }
      });
      //------------------------
    });
    $('ol').sortable();  //拖曳排序
  //-----------------------------
});
