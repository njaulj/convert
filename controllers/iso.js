var ndir = require('ndir');
var assert = require('assert');
var fs=require('fs')
var path = require('path')


exports.convert = function(req,res){
     var method = req.method.toLowerCase();
    if(method==='get'){

      res.render('preIso')
    }else{
       var tmpPath = req.files.file.path
       var fileName =req.files.file.name
        var targetPath = '/Users/liujun/coding/spm/public/uploads/isos/'+fileName
        var conPath = '/Users/liujun/coding/spm/public/converted/isos/'+fileName


        fs.rename(tmpPath, targetPath , function(err) {
            if (err) {
                console.log(err)
            }

            

var lineNumber = 0;
var illNumber=0;
ndir.createLineReader(targetPath).on('line', function(line) {



  assert.ok(Buffer.isBuffer(line));
  var _line=line.toString()
  if(_line.match(/"{1}.+"{1}/)){
  var m= _line.match(/"{1}.+"{1}/)[0]
  var n=m.replace(',',' ')
  var o=n.replace(/"/g,'')

   _line= _line.replace(/"{1}.+"{1}/,o)
 //  console.log(_line)
 // console.log('%d: %s', ++lineNumber, line.toString());
illNumber++
var arr=[lineNumber+1,'\n']
fs.appendFile('iso_error.txt',arr,'utf-8',function(err,data){
    if(err)  
    {  
        console.log(err);  
    }  
  })
  }

  _line = _line.replace('\r','')

  var a = _line.split(',')
  var b =[]
  var c=[]
     if(lineNumber==0){
     c =[
    'SOURCETYPE',
    'DISIPLINE',
    'MASTER_REF',
    'UNIT',
    'AREA',
    'ISO',
    'ITR',
    'IDENT_CODE',
    'GROUP',
    'PART',
    'TAG_NUMBER',
    'SIZE1',
    'SIZE2',
    'SIZE3',
    'SIZE4',
    'SHORT_DESC',
    'DESCRIPTION',
    'QTY',
    'UNIT',
    '\r'
    ]


  fs.appendFile(conPath,c,'utf-8',function(err,data){
    if(err)  
    {  
        console.log(err);  
    }  
  })
}
 // console.log(lineNumber)



   var size1='' 
   var size2=''
  if(a[15]){
     size1='-'+a[15]
  }
  if(a[17]){
    size2='-'+a[17]
  }

  var s=a[10]+size1+size2
  s=s.replace(/\s+/g,'')
 // a.splice(10,0,s)

  var group
  var part
  var _group=a[21].substring(0,a[21].indexOf(' '))
  switch(_group){

  case 'PIPE':
{
  if(a[10].substring(0,2)=='PN'){
group ='PJ'
part='EL'
break

  }
  else if(a[10].substring(0,2)=='PI'){
    group ='PP'
    part='PS'
    break
  }
  else{
    group ='a'
    part='b'
    break
  }

}
case 'FLANGE':{
group='PF'
part='FP'
break
}
case 'PIPING':{
group='PP'
part='PS'
break
}
case 'ELBOW':{
group='PJ'
part='EL'
break
}
case 'STUB-END':{
group='PJ'
part='EL'
break
}
case 'UNION':{
group='PJ'
part='EL'
break
}
case 'BRANCH':{
group='PJ'
part='EL'
break
}
case 'CAP':{
group='PJ'
part='EL'
break
}
case 'EQUAL':{
group='PJ'
part='EL'
break
}
case 'REDUCER':{
group='PJ'
part='EL'
break
}
case 'SWAGE':{
group='PJ'
part='EL'
break
}
case 'TEE':{
group='PJ'
part='EL'
break
}
case 'SPECTACLE':{
group='PB'
part='BB'
break
}
case 'STUB':{
group='PF'
part='FP'
break
}
case 'VALVE':{
group='PV'
part='VG'
break
}
case 'BALL':{
group='PV'
part='VG'
break
}
case 'GASKET':{
group='PG'
part='GP'
break
}
case 'STUDBOLT':{
group='PL'
part='LM'
break
}
case 'GATE':{
group='PV'
part='VG'
break
}
case 'FLOAT':{
group='PV'
part='VG'
break
}
case 'SAMPLE':{
group='PV'
part='VG'
break
}
case 'PLUG':{
group='PJ'
part='EL'
break
}
case 'FLANGED':{
group='PJ'
part='EL'
break
}
case 'REINFORCED':{
group='PQ'
part='AA'
break
}
case 'COUPLING':{
group='PJ'
part='EL'
break
}
case 'M':{
group='PP'
part='PS'
break
}
case 'SPACER':{
group='PB'
part='BB'
break
}
case 'CS':{
group='PF'
part='FP'
break
}
case 'STEAM':{
group='PV'
part='VG'
break
}
case 'CONDENSATE':{
group='PV'
part='VG'
break
}
case 'T-TYPE':{
group='PM'
part='SY'
break
}
case 'BASKET':{
group='PM'
part='SY'
break
}
case 'TEMPORARY':{
group='PM'
part='SY'
break
}
case 'T-TYPE':{
group='PM'
part='SY'
break
}
case 'DUPLEX':{
group='PM'
part='SY'
break
}
case 'FLEXIBLE':{
group='PM'
part='SY'
break
}
case 'FLAME':{
group='PM'
part='SY'
break
}
case '350NB;':{
group='PM'
part='SY'
break
}
case 'COMBINATION':{
group='PM'
part='SY'
break
}
case 'SPADE':{
group='PB'
part='BB'
break
}
default:
{group='a'
part='b'
}

    }
//a.splice(10,0,part)
//a.splice(10,0,group)

b.push(a[3])
b.push(a[1])
b.push(a[2])
b.push(a[4])
b.push(a[5])
b.push(a[6])
b.push('TAG WO MS')
b.push('')
b.push(group)
b.push(part)
b.push(s)
b.push(a[15])
b.push(a[17])
b.push('')
b.push('')
b.push(a[10])
b.push(a[21])
b.push(a[8])
b.push(a[9])
b.push('\r')
//console.log(group+','+part)

  fs.appendFile(conPath,b,'utf-8',function(err,data){
    if(err)  
    {  
        console.log(err);  
    }  
  })
//console.log(b)


lineNumber++
}).on('end', function() {
res.render('iso',{
	fileName:fileName
})

//  console.log('read a file done.')
}).on('error', function(err) {
  console.log('error: ', err.message)
});

    

//end
          })

}
}