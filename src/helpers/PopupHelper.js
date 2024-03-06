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
    
    static DisplaySectorPopup(text = 'Operation was successful!', sectors = [], afterCallback = () => {}) {
        Swal.fire({
            title: 'Fill in info',
            text: text,
            html:
                `<div class="swal2-content">
                    <input id="swal-input-name" class="swal2-input" placeholder="Scan Name" type="text">
                    <input id="swal-input-email" class="swal2-input" placeholder="Email Address" type="email">
                    <select id="swal-dropdown" class="swal2-select">
                        <option value="" disabled selected>Select sector</option>
                        ${sectors.map(sector => `<option value="${sector}">${sector}</option>`).join('')}
                    </select>
                </div>`,
            confirmButtonText: 'Continue',
            focusConfirm: false,
            preConfirm: () => {
                const nameInput = document.getElementById('swal-input-name').value;
                const emailInput = document.getElementById('swal-input-email').value;
                const sectorInput = document.getElementById('swal-dropdown').value;
    
                if (!nameInput || !emailInput || !sectorInput) {
                    Swal.showValidationMessage('Please fill in all fields');
                    return false;
                }
    
                if (!emailInput.match(/^\S+@\S+\.\S+$/)) {
                    Swal.showValidationMessage('Please enter a valid email address');
                    return false;
                }
    
                return [nameInput, emailInput, sectorInput];
            },
            allowOutsideClick: () => !Swal.isLoading() // Disable clicking outside to close the modal while loading
        }).then((result) => {
            if (result.isConfirmed) {
                afterCallback(result.value); // Pass the input values to the callback
            }
        });
    }

    static DisplayEmailEditPopup(text = 'Operation was successful!', email = '', afterCallback = () => {}) {
        Swal.fire({
            text: text,
            input: 'email',
            inputValue: email,
            confirmButtonText: 'Save',
            showCancelButton: true,
            allowOutsideClick: () => !Swal.isLoading() // Disable clicking outside to close the modal while loading
        }).then((result) => {
            if (result.isConfirmed) {
                afterCallback(result.value);
            }
        });
    }
    
    

}

export default SwalHelper;
