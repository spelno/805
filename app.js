/************************************************************
 * DELAPAN KOSONG LIMA MART
 * FRONTEND
 ************************************************************/


const API_URL =
  'https://script.google.com/macros/s/AKfycbzcP4oLv9Xj9gEv526HOFnK5wkyb1oDNeurvYLdIv2ueOpux7JMgpyN8P9RBIMwS9olVA/exec';



/************************************************************
 * LOGIN
 ************************************************************/

async function login() {

  const nameInput =
    document.getElementById('name');

  const pinInput =
    document.getElementById('pin');

  const button =
    document.getElementById('loginButton');

  const message =
    document.getElementById('message');


  const name =
    nameInput.value.trim();

  const pin =
    pinInput.value.trim();


  message.textContent = '';

  message.className = 'message';


  if (!name) {

    showMessage(
      'Nama pengguna wajib diisi.',
      'error'
    );

    nameInput.focus();

    return;

  }


  if (!/^\d{6}$/.test(pin)) {

    showMessage(
      'PIN harus terdiri dari 6 digit.',
      'error'
    );

    pinInput.focus();

    return;

  }


  button.disabled = true;

  button.textContent = 'MEMERIKSA...';


  try {

    const response =
      await fetch(
        API_URL,
        {

          method: 'POST',

          headers: {
            'Content-Type':
              'text/plain;charset=utf-8'
          },

          body: JSON.stringify({

            action: 'login',

            name: name,

            pin: pin

          })

        }
      );


    const result =
      await response.json();


    if (!result.success) {

      showMessage(
        result.message ||
        'Login gagal.',
        'error'
      );

      return;

    }


    /*
     * Simpan informasi login.
     */

    localStorage.setItem(
      '805_session',
      JSON.stringify({
        user_id:
          result.user.user_id,

        name:
          result.user.name,

        role:
          result.user.role,

        login_time:
          new Date().toISOString()
      })
    );


    showMessage(
      'Login berhasil. Membuka dashboard...',
      'success'
    );


    /*
     * Untuk tahap berikutnya,
     * halaman ini akan diarahkan
     * ke dashboard.
     */

    setTimeout(
      function() {

        window.location.href =
          'dashboard.html';

      },
      700
    );


  } catch (error) {

    console.error(error);

    showMessage(
      'Tidak dapat terhubung ke server.',
      'error'
    );

  } finally {

    button.disabled = false;

    button.textContent = 'MASUK';

  }

}



/************************************************************
 * TAMPILKAN PESAN
 ************************************************************/

function showMessage(
  text,
  type
) {

  const message =
    document.getElementById('message');


  message.textContent = text;

  message.className =
    'message ' + type;

}



/************************************************************
 * HANYA ANGKA UNTUK PIN
 ************************************************************/

document
  .getElementById('pin')
  .addEventListener(
    'input',
    function() {

      this.value =
        this.value
          .replace(/\D/g, '')
          .slice(0, 6);

    }
  );



/************************************************************
 * ENTER UNTUK LOGIN
 ************************************************************/

document.addEventListener(
  'keydown',
  function(event) {

    if (
      event.key === 'Enter'
    ) {

      login();

    }

  }
);
