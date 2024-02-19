export default function formatNumber(phoneNumber: string): string {

    const numberWithoutCUs = phoneNumber.replace(/@c.us/g, '');

    const numberWithoutPrefix = numberWithoutCUs.startsWith('244') ? numberWithoutCUs.substring(3) : numberWithoutCUs;
  
    return numberWithoutPrefix;
  }
  