module.exports = (express, connection) => {
	
	const router = express.Router();
	
	
	
    router.get('/sinhvien', (req, res) => {
		connection.query('SELECT * FROM sinhvien ORDER BY created_at DESC', function (error, results, fields) {
			if (error) res.json({err: error});
			res.json({sinhvien: results})
		});
	})
	
	router.get('/sinhvien/:id', (req, res) => {
		let id = req.params.id
		connection.query(`SELECT * FROM sinhvien WHERE id = ${id}`, function (error, results, fields) {
			if (error) res.json({err: error});
			res.json({sinhvien: results})
		});
	})
	
    router.post('/sinhvien/add', async (req, res) => {
		let form = req.body
		
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var PhoneRegex = /^[0-9]{10,12}$/;
		
		if (!form.hoten) {
			res.json({err: 'Họ tên không được để trống.'})
		} else if (!form.ngaysinh) {
			res.json({err: 'Ngày sinh không được để trống.'})
		} else if (!form.email) {
			res.json({err: 'Email không được để trống.'})
		} else if (!emailRegex.test(form.email)) {
			res.json({err: 'Email không hợp lệ.'})
		} else if (!PhoneRegex.test(form.dienthoai)) {
			res.json({err: 'Số điện thoại không hợp lệ.'})
		} else {
			let data = {
				fullname: form.hoten,
				email: form.email,
				birthday: form.ngaysinh,
				phone: form.dienthoai,
				address: form.diachi,
				created_at: new Date(),
				updated_at: new Date()
			}
			connection.query(`SELECT * FROM sinhvien WHERE email = '${form.email}'`, function (error, results, fields) {
				if (error) res.json({err: error});
				
				if (results.length < 1) {
					connection.query('INSERT INTO sinhvien SET ?', data, function (error1, results1, fields1) {
						if (error1) res.json({err: 'Thêm thất bại.'});
						
						connection.query('SELECT * FROM sinhvien ORDER BY created_at DESC', function (error2, results2, fields2) {
							if (error2) res.json({err: error2});
							res.json({
								msg: 'Thêm thành công.',
								sinhvien: results2
							})
						});
					});
				}else {
					res.json({err: 'Email đã có người đăng ký'});
				}
			});
			
			
		}
	})
	
    router.put('/sinhvien/:id', (req, res) => {
		let id = req.params.id
		let form = req.body
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var PhoneRegex = /^[0-9]{10,12}$/;
		
		if (!form.hoten) {
			res.json({err: 'Họ tên không được để trống.'})
		} else if (!form.ngaysinh) {
			res.json({err: 'Ngày sinh không được để trống.'})
		} else if (!form.email) {
			res.json({err: 'Email không được để trống.'})
		} else if (!emailRegex.test(form.email)) {
			res.json({err: 'Email không hợp lệ.'})
		} else if (!PhoneRegex.test(form.dienthoai)) {
			res.json({err: 'Số điện thoại không hợp lệ.'})
		} else {
			let data = {
				fullname: form.hoten,
				email: form.email,
				birthday: form.ngaysinh,
				phone: form.dienthoai,
				address: form.diachi,
				updated_at: new Date()
			}
			connection.query('UPDATE sinhvien SET ? WHERE id = ?', [data, id], function (error, results, fields) {
				if (error) res.json({err: 'Sửa thất bại.'});
				
				connection.query('SELECT * FROM sinhvien ORDER BY created_at DESC', function (error, results, fields) {
					if (error) res.json({err: 'Sửa thất bại.'});
					res.json({
						msg: 'Sửa thành công.',
						sinhvien: results
					})
				});
			});
		}
	})
	
    router.delete('/sinhvien/:id', (req, res) => {
		let id = req.params.id
		connection.query('DELETE FROM sinhvien WHERE id = ?', id, function (error, results, fields) {
			if (error) res.json({err: 'Xóa thất bại.'});
			
			connection.query('SELECT * FROM sinhvien ORDER BY created_at DESC', function (error, results, fields) {
				if (error) res.json({err: 'Xóa thất bại.'});
				res.json({
					msg: 'Xóa thành công.',
					sinhvien: results
				})
			});
		});
	})
	
	return router
};