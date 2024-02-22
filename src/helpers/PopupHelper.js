import Swal from 'sweetalert2';

class SwalHelper
{
    static DisplaySuccessPopup(text = 'Operation was successful!', afterCallback = () => {}) {
        Swal.fire({
            title: 'Success!',
            text: text,
            icon: 'success',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                afterCallback();
            }
        })
    }
}

export default SwalHelper;
