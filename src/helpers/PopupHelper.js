import Swal from 'sweetalert2';

/**
 * Helper class for displaying Swal popups.
 */
class SwalHelper {
    /**
     * Displays a success popup with the given text.
     * @param {string} [text='Operation was successful!'] - The text to display in the popup.
     * @param {Function} [afterCallback=() => {}] - The callback function to execute after the user confirms the popup.
     * @returns {void}
     */
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

    /**
     * Displays an error popup with the given text.
     * @param {string} [text='Oh no, something went wrong!'] - The text to display in the popup.
     * @param {Function} [afterCallback=() => {}] - The callback function to execute after the user confirms the popup.
     * @returns {void}
    */
    static DisplayErrorPopup(text = 'Oh no, something went wrong!', afterCallback = () => {}) {
        Swal.fire({
            title: 'Error!',
            text: text,
            icon: 'error',
        }).then(() => {
            afterCallback();
        })
    }
}

export default SwalHelper;
