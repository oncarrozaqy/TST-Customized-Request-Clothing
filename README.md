# TST-Customized-Request-Clothing

Tugas berikut merupakan deployment terkait FastAPI service yang digunakan untuk memfasilitasi core service dari ide bisnis yang saya ajukan, yaitu Customized Request pada Handmade Clothing. Layanan ini memungkinkan pengguna untuk melakukan permintaan pesanan baju sesuai dengan keinginannya seperti font, size, color, dan tipe pakaian. Selain itu, pengguna juga dapat melakukan request order dengan memberikan beberapa instruksi khusus terkait baju yang diinginkan. 

Beberapa endpoint yang ada pada API ini adalah sebagai berikut.

GET /products: Read All Products. Digunakan untuk melihat keseluruhan produk pakaian yang tersedia.

GET /products/{Cloth}: Clothes Preferences. Digunakan untuk menampilkan pakaian yang sesuai dengan preferensi pengguna dengan meminta beberapa parameter masukan.

POST /customizationRequests: Create Request. Digunakan untuk membuat request terkait pakaian yang sesuai dengan pengguna.

DELETE /customizationRequests/{customizationID}: Delete Request. Dilakukan untuk menghapus request yang telah dibuat berdasarkan customizationID tertentu.

GET /customizationRequests/{customerID}: Read Request. Dilakukan untuk melihat request berdasarkan customerID tertentu.

Pada API ini, digunakan juga file JSON sebagai sumber data utama pada program python yang dibuat. Pada file core.json, telah disimpan beberapa data customizationRequest, customers, dan products.

URL API: 52.152.205.190/docs
