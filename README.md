# Tubes3_13521077
Tugas Besar 3 <br>
IF2211 Strategi Algoritma <br>
Penerapan String Matching dan Regular Expression dalam Pembuatan ChatGPT Sederhana

## Daftar Isi

- [Penjelasan Ringkas Program](#penjelasan-ringkas-program)
- [Pre-Requisite](#pre-requisite)
- [Cara Menjalankan Program](#cara-menjalankan-program)
- [Screenshot Program](#screenshot-program)
- [Kontributor](#kontributor)

## Penjelasan Ringkas Program

GPTkw adalah aplikasi ChatGPT sederhana dengan mengaplikasikan pendekatan Question-Answer yang paling sederhana. Program ini dikembangkan dengan bahasa pemrograman Node.js pada sisi backend dan bahasa pemrograman Next.js pada sisi frontend. Dalam implementasinya, program ini memanfaatkan beberapa algoritma antara lain: Algoritma Knuth-Morris-Pratt (KMP), Boyer-Moore (BM), Regular Expression, dan Longest Common Subsequence (LCS). Algoritma pencocokan string Knuth-Morris-Pratt (KMP) dan Boyer-Moore (BM) digunakan untuk melakukan pencarian pertanyaan yang paling mirip dengan pertanyaan yang diberikan pengguna. Regular Expression digunakan untuk menentukan format dari pertanyaan (akan dijelaskan lebih lanjut pada bagian fitur aplikasi). Jika tidak ada satupun pertanyaan pada database yang exact match dengan pertanyaan pengguna melalui algoritma KMP ataupun BM, maka gunakan pertanyaan termirip dengan kesamaan setidaknya 90%. Apabila tidak ada pertanyaan yang kemiripannya di atas 90%, maka chatbot akan memberikan maksimum 3 pilihan pertanyaan yang paling mirip dengan pertanyaan pengguna. Rasio kemiripan pertanyaan ini diimplementasikan dengan algoritma Longest Common Subsequence.

## Pre-Requisite
* Java (minimal Java 11), dapat diunduh melalui `https://www.oracle.com/java/technologies/downloads/#java`
* NodeJS, dapat diunduh melalui `https://nodejs.org/en/download/`
* Paket/Modul tambahan :
    * Mysql, dapat diinstall dengan mengetikkan `npm install mysql` pada terminal
    * PriorityQueue, dapat diinstall dengan mengetikkan `npm install fastpriorityqueue` pada terminal
    * Next, dapat diinstall dengan mengetikkan `npm install next` pada terminal

## Cara Menjalankan Program
1. Buka terminal baru pada repository <br>
2. Pindahkan directory terminal ke folder backend <br>
atau ketikkan `cd backend` <br>
3. Pastikan port :8000 sedang tidak terpakai<br>
Lakukan pengecekan dengan mengetikkan `netstat -ano | findstr :8000`.<br>
Anda dapat melakukan terminate program pada port tersebut dengan mengetikkan `taskkill /pid <Process_ID> /F`
4. Masukkan perintah `npm run dev` pada terminal untuk menjalankan program backend
5. Buka terminal baru pada repository <br>
6. Pindahkan directory terminal ke folder frontend <br>
atau ketikkan `cd frontend` <br>
7. Masukkan perintah `npm run dev` pada terminal untuk menjalankan program backend
8. Buka program dengan meng-klik URL yang muncul pada terminal frontend

## Screenshot Program

<img src="./program.png">

## Kontributor

13521077 Husnia Munzayana <br>
13521111 Tabitha Permala <br>
13521130 Althaaf Khasyi Atisomya
