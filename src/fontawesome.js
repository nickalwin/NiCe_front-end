
/**
 * Font Awesome Icons Configuration and Import
 *
 * This module imports Font Awesome icons and adds them to the library using the Font Awesome core.
 * It provides the FontAwesomeIcon component that can be used to display the imported icons in Vue components.
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
    faPhone, faEnvelope, faMapMarkerAlt, faLeaf, faSun, faInfo, faEye, faEyeSlash, faEdit,
    faRecycle, faKey, faBars, faHouse, faLanguage, faCaretDown, faAsterisk, faIndustry,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faPhone, faEnvelope, faMapMarkerAlt, faLeaf, faSun, faInfo, faEye, faEyeSlash, faEdit,
    faRecycle, faKey, faBars, faHouse, faLanguage, faCaretDown, faAsterisk, faIndustry,
);

export default FontAwesomeIcon;
