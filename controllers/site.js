var fs = require('fs')


exports.index = function(req,res){
	res.render('index')
}


exports.checkuBulk = function(next){
	fs.exists('../public/uploads/bulk.csv',function(exists){
		if(exists){
			fs.unlink('../public/uploads/bulk.csv',function(err){
				if(err){
					console.log('s')
				}
				next()
			})
		}
		else{
			next()
		}
	})
}

exports.checkuIso = function(next){
	fs.exists('../public/uploads/iso.csv',function(exists){
		if(exists){
			fs.unlink('../public/uploads/iso.csv',function(err){
				if(err){
					console.log('s')
				}
				next()
			})
		}
		else{
			next()
		}
	})
}


exports.checkcBulk = function(next){
	fs.exists('../public/uploads/bulk_con.csv',function(exists){
		if(exists){
			fs.unlink('../public/uploads/bulk_con.csv',function(err){
				if(err){
					console.log('s')
				}
				next()
			})
		}
		else{
			next()
		}
	})
}

exports.checkcIso = function(next){
	fs.exists('../public/uploads/iso_con.csv',function(exists){
		if(exists){
			fs.unlink('../public/uploads/iso_con.csv',function(err){
				if(err){
					console.log('s')
				}
				next()
			})
		}
		else{
			next()
		}
	})
}