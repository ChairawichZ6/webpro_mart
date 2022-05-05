# webpro_mart
## github นี้ ทำเพื่อเก็บโครงงาน final project วิชา Web programming 2022
## เพื่อศึกษาและนำความรู้จากคาบเรียนมาประยุกษ์ใช้
## จัดทำโดย
 1) นางสาว จุฑามาศ ชนาฐิติกุล 63070022
 2) นาย ชัยรวิชญ์ เอี่ยมขจรชัย 63070034

####notes#######
สำหรับใช้ทดลองระบบ
username: admin
password : Aa123456
#####################

# วิธีการใช้งานเบื้องต้น 
### เว็บไซต์ร้านค้าปลีก MartNextGen จะแบ่งออกเป็น 2 ส่วน
### ได้แก่ Customer และ Admin
# [ฝั่ง Customer]
## -> ส่วนแรก "Customer" จะสามารถ register เข้ามาใช้งานเว็บไซต์ได้ เมื่อ register เสร็จสิ้นแล้ว
ก็จะต้องทำการ Login ด้วย username และ password ที่สมัครเอาไว้โดยทางเว็บไซต์มีการ validate ให้
เมื่อ login เข้ามาแล้วก็จะเป็นหน้า HOME จะมีคูปอง และ สินค้าให้เลือกซื้อ  และสามารถ Search หาข้อมูลสินค้า
ที่ต้องการที่ด้วยเมื่อหาไม่เจอ 

## -> เมื่อได้สินค้าที่ต้องการแล้ว ก็สามารถกดที่รูปตระกร้า เพื่อไปที่หน้ากระกร้า ตรวจสอบสินค้า ที่เลือกมา และ ทำการยืนยัน
ระบบจะทำการปริ้นใบเสร็จออกมา พร้อมสรุป ยอดรวมทั้งหมด ตามด้วยข้อมูลของ Customer และมี QRcode สำหรับ สแกน เพื่อจ่ายเงินได้ เมื่อทำการแสกนชำระแล้วก็จะเด้งไปที่หน้าชำระเงินเสร็จสิ้น
โดยที่ Customer สามารถเลือกใช้คูปองส่วนลดได้ โดยข้อมูลการสั่งซื้อของลูกค้าก็จะถูกจัดเก็บเข้าไปใน database ของ MartNextGen

# [ฝั่ง Admin]
## -> ทำการ login ด้วย username , password ที่ระบบเตรียมมาไว้ให้ มีการ validate
เมื่อ login แล้วก็จะมาที่หน้า Home โดยจะมีรายละเอียด คูปอง สินค้า โดย admin สามารถเพิ่มหรือลบได้
และเมื่อทำการเพิ่มสินค้า เข้าไปในร้านค้าแล้ว ระบบก็จะจัดเก็บข้อมูล สินค้า เข้าไปไว้ใน database ของ MartNextGen เช่นกัน

==================================================================
                                    Web Programming by 22/34
