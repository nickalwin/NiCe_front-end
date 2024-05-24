import Swal from 'sweetalert2';
import i18n from '../i18n/index.js';

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
    static DisplaySuccessPopup(text = i18n.global.t('success.operation_success'), afterCallback = () => {}) {
        Swal.fire({
            title: i18n.global.t('success.success'),
            text: text,
            icon: 'success',
            confirmButtonText: 'OK',
            heightAuto: false,
        }).then((result) => {
            if (result.isConfirmed) {
                afterCallback();
            }
        })
    }

    static DisplayDangerousDeleteQuestionPopup(afterCallback = () => {}) {
        Swal.fire({
            title: i18n.global.t('utils.danger'),
            text: i18n.global.t('utils.are_you_sure_delete'),
            icon: 'warning',
            confirmButtonText: 'No',
            denyButtonText: 'Yes',
            showDenyButton: true,
            heightAuto: false,
        }).then((result) => {
            if (result.isDenied) {
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
    static DisplayErrorPopup(text = i18n.global.t('errors.oh_no_smth_wrong'), afterCallback = () => {}) {
        Swal.fire({
            title: i18n.global.t('errors.error'),
            text: text,
            icon: 'error',
            heightAuto: false,
        }).then(() => {
            afterCallback();
        })
    }

    static DisplayErrorPopupWithTryAgain(text = i18n.global.t('errors.error'), againCallback = () => {}) {
        Swal.fire({
            title: i18n.global.t('errors.error'),
            text: text,
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: i18n.global.t('utils.try_again'),
            cancelButtonText: i18n.global.t('utils.cancel'),
            heightAuto: false,
        }).then((result) => {
            if (result.isConfirmed) {
                againCallback();
            }
        })
    }

    static DisplayUniqueCodePopup(afterCallback = () => {}) {
        Swal.fire({
            title: `<span class="icon is-small mr-2"><FontAwesomeIcon icon="fa-edit" /></span>${
                i18n.global.t('utils.fill_in_ucode')
            }`,
            input: 'text',
            confirmButtonText: i18n.global.t('utils.continue'),
            heightAuto: false,
            preConfirm: (uniqueCode) => {
                if (!uniqueCode) {
                    Swal.showValidationMessage(i18n.global.t('errors.missing_ucode'));

                    return false;
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                afterCallback(result.value);
            }
        });
    }


    static DisplayEmailEditPopup(text = i18n.global.t('success.operation_success'), email = '', afterCallback = () => {}) {
        Swal.fire({
            text: text,
            input: 'email',
            inputValue: email,
            confirmButtonText: i18n.global.t('utils.save'),
            showCancelButton: true,
            heightAuto: false,
            allowOutsideClick: () => !Swal.isLoading() // Disable clicking outside to close the modal while loading
        }).then((result) => {
            if (result.isConfirmed) {
                afterCallback(result.value);
            }
        });
    }



}

export default SwalHelper;
