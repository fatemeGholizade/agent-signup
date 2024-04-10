export function toFarsiNumber(n: any) {
    if (n) {
      const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return n.toString().replace(/\d/g, (x: any) => farsiDigits[x]);
    } else return "";
  }
  