function ex(f1)
{
  var flnam=f1.value.split('\\').pop().split('/').pop();
  var ext=flnam.split('.').pop();
  switch(ext)
    {
        case 'doc':
        case 'docx':
        case 'txt':
		document.getElementById('file_name').value = flnam;
            break;
        default:
            alert('Only .doc, .docx and .txt files are allowed...');
            f.value='';
	    file_name.value='';
    }
}


function adminex(f1)
{
  var flnam=f1.value.split('\\').pop().split('/').pop();
  var ext=flnam.split('.').pop();
  switch(ext)
    {
        case 'csv':
        
    document.getElementById('file_name').value = flnam;
            break;
        default:
            alert('Only csv files are allowed...');
            f.value='';
      file_name.value='';
    }
}


function setName(getname){
  var flnam=getname.value.split('\\').pop().split('/').pop();
  document.getElementById('file_name').value = flnam;
}

function no_file_check()
{
var flname = document.getElementById('file_name').value;
 if ( flname == '' )
 {
  alert('No file selected..Please select a file first..');
  f.value='';
  return false;
 }
 else
  return true;
}
