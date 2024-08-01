import Toast from 'react-native-toast-message';
import fonts from '../Font/fonts';
import { StyleSheet } from 'react-native';

// Color mapping for different error types
const colorMapping = {
    error: '#e74c3c',  // Red color for error
    success: '#07bc0c', // Green color for success
    info: '#3498db',   // Blue color for info
    warning: '#f1c40f' // Orange color for warning
};

const styles = StyleSheet.create({
    text1Style: {
        fontSize: 13.5,
        fontFamily: fonts.book,
        flexWrap: 'wrap',
    },
    text2Style: {
        fontSize: 11,
        fontFamily: fonts.book,
        color: 'gray',
        flexWrap: 'wrap',
    },
    toastContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

// Function to show toast messages
export const showToast = (type, msg1, msg2, options = {}) => {
    const {
        duration = 4000,
        position = 'top',
        onPress = () => Toast.hide(),
        onHide = null,
        icon = null,
        topOffset=0,
        animation = 'slideInUp',
    } = options;

    Toast.show({
        type: type,
        text1: msg1,
        text2: msg2,
        text1Style: [styles.text1Style, { color: colorMapping[type] || '#000' }],
        text2Style: styles.text2Style,
        style: styles.toastContainer,
        duration: duration,
        position: position,
        onPress: onPress,
        onHide: onHide,
        icon: icon,
        animation: animation,
        topOffset,
        zIndex:10,
    });
};



// Name validation function
export const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        showToast('error', 'Invalid Name', 'Name should contain only alphabets.');
        return false;
    }
    return true;
};

// Email validation function
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'hotmail.co.uk', 'hotmail.fr', 'msn.com',
        'yahoo.fr', 'wanadoo.fr', 'orange.fr', 'comcast.net', 'yahoo.co.uk', 'yahoo.com.br', 'yahoo.co.in',
        'live.com', 'rediffmail.com', 'free.fr', 'gmx.de', 'web.de', 'yandex.ru', 'ymail.com', 'libero.it',
        'outlook.com', 'uol.com.br', 'bol.com.br', 'mail.ru', 'cox.net', 'hotmail.it', 'sbcglobal.net',
        'sfr.fr', 'live.fr', 'verizon.net', 'live.co.uk', 'googlemail.com', 'yahoo.es', 'ig.com.br',
        'live.nl', 'bigpond.com', 'terra.com.br', 'yahoo.it', 'neuf.fr', 'yahoo.de', 'alice.it',
        'rocketmail.com', 'att.net', 'laposte.net', 'facebook.com', 'bellsouth.net', 'yahoo.in', 'hotmail.es',
        'charter.net', 'yahoo.ca', 'yahoo.com.au', 'rambler.ru', 'hotmail.de', 'tiscali.it', 'shaw.ca',
        'yahoo.co.jp', 'sky.com', 'earthlink.net', 'optonline.net', 'freenet.de', 't-online.de',
        'aliceadsl.fr', 'virgilio.it', 'home.nl', 'qq.com', 'telenet.be', 'me.com', 'yahoo.com.ar',
        'tiscali.co.uk', 'yahoo.com.mx', 'voila.fr', 'gmx.net', 'mail.com', 'planet.nl', 'tin.it',
        'live.it', 'ntlworld.com', 'arcor.de', 'yahoo.co.id', 'frontiernet.net', 'hetnet.nl', 'live.com.au',
        'yahoo.com.sg', 'zonnet.nl', 'club-internet.fr', 'juno.com', 'optusnet.com.au', 'blueyonder.co.uk',
        'bluewin.ch', 'skynet.be', 'sympatico.ca', 'windstream.net', 'mac.com', 'centurytel.net', 'chello.nl',
        'live.ca', 'aim.com', 'bigpond.net.au'
    ];

    const domain = email.split('@')[1];
    if (!emailRegex.test(email) || !allowedDomains.includes(domain)) {
        showToast('error', 'Invalid Email', 'Please enter a valid email address.');
        return false;
    }
    return true;
};

// Password validation function
export const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
        showToast('error', 'Invalid Password', 'Password must be 8-16 characters long.');
        return false;
    }
    if (!/[a-z]/.test(password)) {
        showToast('error', 'Invalid Password', 'Password must contain at least one lowercase letter.');
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        showToast('error', 'Invalid Password', 'Password must contain at least one uppercase letter.');
        return false;
    }
    if (!/\d/.test(password)) {
        showToast('error', 'Invalid Password', 'Password must contain at least one digit.');
        return false;
    }
    if (!/[@$!%*?&#]/.test(password)) {
        showToast('error', 'Invalid Password', 'Password must contain at least one special character.');
        return false;
    }
    if (/\s/.test(password)) {
        showToast('error', 'Invalid Password', 'Password must not contain spaces.');
        return false;
    }
    return true;
};