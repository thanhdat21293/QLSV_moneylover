<template>
  <div class="container">
	<h1>Quản lý sinh viên</h1>
	<div style="float:left; width:100%; text-align:left">
		<button @click.stop.prevent="addPopup()" class="btn btn-primary" data-toggle="modal">Thêm</button>
	</div>
	<button type="button" class="btn btn-primary" data-toggle="modal" id='btn_addnew' data-target="#addnew" style="display:none">Thêm</button>
	<br>
	<br>
    <table>
		<tr>
			<th>STT</th>
			<th>Họ tên</th>
			<th>Email</th>
			<th>Ngày sinh</th>
			<th>Điện thoại</th>
			<th>Địa chỉ</th>
			<th>Ngày tạo</th>
			<th></th>
		</tr>
		<tr v-for='item, index in sinhvien'>
			<td>{{index + 1}}</td>
			<td>{{item.fullname}}</td>
			<td>{{item.email}}</td>
			<td>{{item.birthday}}</td>
			<td>{{item.phone}}</td>
			<td>{{item.address}}</td>
			<td>{{item.created_at}}</td>
			<td>
				<button @click.stop.prevent="editPopup(item.id)" class="btn btn-primary" data-toggle="modal">Sửa</button>
				<button @click.stop.prevent="deleteSinhVien(item.id)" class="btn btn-primary" data-toggle="modal">Xóa</button>
			</td>
		</tr>
	</table>
	
	<button class="btn btn-primary" data-toggle="modal" data-target="#editsinhvien" id="btn_editsinhvien" style="display:none">Sửa</button>
	
	<!-- Modal Them SV -->
	<div class="modal fade" id="addnew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="exampleModalLabel">Thêm mới sinh viên</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
			<form id="addForm">
				<div class="alert alert-warning" role="alert" v-if='err'>
				  {{err}}
				</div>
				<div class="alert alert-warning" role="alert" v-if='msg'>
				  {{msg}}
				</div>
			  <div class="form-group">
				<label for="hoten">Họ tên</label>
				<input type="text" class="form-control" id="hoten" name="hoten">
			  </div>
			  
			  <div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" name="email">
			  </div>
			  
			  <div class="form-group">
				<label for="ngaysinh">Ngày sinh</label>
				<input type="date" class="form-control" id="ngaysinh" name="ngaysinh" required>
			  </div>
			  
			  <div class="form-group">
				<label for="dienthoai">Điện thoại</label>
				<input type="text" class="form-control" id="dienthoai" name="dienthoai">
			  </div>
			  
			  <div class="form-group">
				<label for="diachi">Địa chỉ</label>
				<input type="te" class="form-control" id="diachi" name="diachi">
			  </div>
			  
			</form>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
			<button type="button" class="btn btn-primary" @click.stop.prevent="addNew">Save</button>
		  </div>
		</div>
	  </div>
	</div>
	
	<!-- Modal edit SV -->
	<div class="modal fade" id="editsinhvien" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa sinh viên</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
			<form id="editForm">
				<input type="hidden" name="id" id='idSV'>
				<div class="alert alert-warning" role="alert" v-if='err'>
				  {{err}}
				</div>
				<div class="alert alert-warning" role="alert" v-if='msg'>
				  {{msg}}
				</div>
			  <div class="form-group">
				<label for="hoten1">Họ tên</label>
				<input type="text" class="form-control" id="hoten1" name="hoten">
			  </div>
			  
			  <div class="form-group">
				<label for="email1">Email</label>
				<input type="email" class="form-control" id="email1" name="email">
			  </div>
			  
			  <div class="form-group">
				<label for="ngaysinh1">Ngày sinh</label>
				<input type="date" class="form-control" id="ngaysinh1" name="ngaysinh" required>
			  </div>
			  
			  <div class="form-group">
				<label for="dienthoai1">Điện thoại</label>
				<input type="text" class="form-control" id="dienthoai1" name="dienthoai">
			  </div>
			  
			  <div class="form-group">
				<label for="diachi1">Địa chỉ</label>
				<input type="te" class="form-control" id="diachi1" name="diachi">
			  </div>
			  
			</form>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			<button type="button" class="btn btn-primary" @click.stop.prevent="editSinhVien">Update</button>
		  </div>
		</div>
	  </div>
	</div>
	
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
let SERVER = 'http://localhost:3001'
export default {
  data () {
    return {
      sinhvien: [],
	  err: '',
	  msg: ''
    }
  },
  created () {
    this.err = this.msg = ''
    axios.get(`${SERVER}/api/sinhvien`)
      .then(res => {
		res.data.sinhvien.map((item, index) => {
		  res.data.sinhvien[index].birthday = this.dateFormat(res.data.sinhvien[index].birthday)
			    res.data.sinhvien[index].created_at = this.dateFormat(res.data.sinhvien[index].created_at)
		})
        this.sinhvien = res.data.sinhvien
      })
  },
  methods: {
    addNew () {
      this.err = this.msg = ''
      let data = $('#addForm').serialize()
      axios.post(`${SERVER}/api/sinhvien/add`, data)
        .then(res => {
          if (res.data.err) {
		    this.err = res.data.err
		  } else {
            this.msg = res.data.msg
			res.data.sinhvien.map((item, index) => {
			  res.data.sinhvien[index].birthday = this.dateFormat(res.data.sinhvien[index].birthday)
			    res.data.sinhvien[index].created_at = this.dateFormat(res.data.sinhvien[index].created_at)
		    })
            this.sinhvien = res.data.sinhvien
			$('.close').click()
		  }
        })
    },
    editSinhVien () {
      this.err = this.msg = ''
      let data = $('#editForm').serialize()
	  let id = $('#idSV').val()
	 axios.put(`${SERVER}/api/sinhvien/${id}`, data)
	  .then(result => {
		if (result.data.err) {
		  this.err = result.data.err
		} else {
		  this.msg = result.data.msg
		  result.data.sinhvien.map((item, index) => {
		    result.data.sinhvien[index].birthday = this.dateFormat(result.data.sinhvien[index].birthday)
			    result.data.sinhvien[index].created_at = this.dateFormat(result.data.sinhvien[index].created_at)
		  })
		  this.sinhvien = result.data.sinhvien
		  $('.close').click()
	   }
	 })
    },
    addPopup () {
	  $('#addForm')[0].reset();
      this.err = this.msg = ''
      $('#btn_addnew').click()
    },
    editPopup (id) {
      this.err = this.msg = ''
      let data = $('#editForm').serialize()
      axios.get(`${SERVER}/api/sinhvien/${id}`)
	    .then(res => {
		  if (res.data.err) {
            this.err = res.data.err
          } else {
		    let sinhvien = res.data.sinhvien[0]
			
			let birthday = this.dateFormat(sinhvien.birthday)
		    $('#idSV').val(sinhvien.id)
		    $('#hoten1').val(sinhvien.fullname)
		    $('#email1').val(sinhvien.email)
		    $('#dienthoai1').val(sinhvien.phone)
		    $('#ngaysinh1').val(birthday)
		    $('#diachi1').val(sinhvien.address)
		    $('#btn_editsinhvien').click()
		  }
		})
    },
	deleteSinhVien (id) {
      this.err = this.msg = ''
	  var r = confirm("Bạn có muốn xóa?");
	  if (r === true) {
	    axios.delete(`${SERVER}/api/sinhvien/${id}`)
		  .then(res => {
		    if (res.data.err) {
		      this.err = res.data.err
		    } else {
		      this.msg = res.data.msg
			  res.data.sinhvien.map((item, index) => {
			    res.data.sinhvien[index].birthday = this.dateFormat(res.data.sinhvien[index].birthday)
			    res.data.sinhvien[index].created_at = this.dateFormat(res.data.sinhvien[index].created_at)
			  })
		      this.sinhvien = res.data.sinhvien
		      $('.close').click()
	        }
		  })
	  }
	},
	dateFormat (tdate) {
		let date = new Date(tdate)
		
		let ngay = '00'
		if (date.getDate() < 10) {
		  ngay = '0' + date.getDate()
		} else {
		  ngay = date.getDate()
		}
		
		let thang = '00'
		if (date.getMonth() < 10) {
		  thang = '0' + date.getDate()
		} else {
		  thang = date.getMonth()
		}
		
		let dateConvert =  date.getFullYear() + '-' + thang + '-' + ngay
		return dateConvert
	}
  }
}
</script>

<style scoped>
table tr th, table tr td {
    border: 1px solid #ccc;
    padding: 5px 10px;
	    font-size: 12px;
}
.alert,
label,
input,
.btn {
    font-size: 12px;
}
table {
    border-collapse: collapse;
}
h1 {
	text-align: center
}
</style>
