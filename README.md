# TST-Customized-Request-Clothing

Tugas berikut merupakan deployment terkait FastAPI service yang digunakan untuk memfasilitasi core service dari ide bisnis yang saya ajukan, yaitu Customized Request pada Handmade Clothing. Layanan ini memungkinkan pengguna untuk melakukan permintaan pesanan baju sesuai dengan keinginannya seperti font, size, color, dan tipe pakaian. Selain itu, pengguna juga dapat melakukan request order dengan memberikan beberapa instruksi khusus terkait baju yang diinginkan. 

Beberapa endpoint yang terdapat pada API ini adalah sebagai berikut.

POST /authentications/login: Login. Digunakan untuk autentikasi pengguna (akan dibahas lebih lanjut pada bagian berikutnya).
POST /register: Register. Digunakan untuk mendaftarkan akun bagi pengguna yang belum memiliki akun
GET/customizationRequests: Read All Request. Digunakan untuk membacat request terkait pakaian yang telah dibuat pengguna.
POST /customizationRequests: Create Request. Digunakan untuk membuat request terkait pakaian yang sesuai dengan pengguna.
GET/customizationRequests/{userID}: Read Request. Digunakan untuk membacat request terkait pakaian yang telah dibuat pengguna dengan userID tertentu.
DELETE /customizationRequests/{customizationID}: Delete Request. Dilakukan untuk menghapus request yang telah dibuat berdasarkan customizationID tertentu.
GET /users: Read All Users. Digunakan untuk menampilkan seluruh user yang terdaftar.
DELETE /users: Delete Users. Digunakan untuk menghapus data user tertentu dari database
GET /products: Read All Products. Digunakan untuk melihat keseluruhan produk pakaian yang tersedia.
GET /products/{Cloth}: Clothes Preferences. Digunakan untuk menampilkan pakaian yang sesuai dengan preferensi pengguna dengan meminta beberapa parameter masukan.

URL API: http://20.246.178.157/docs
