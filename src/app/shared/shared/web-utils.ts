export class WebUtils {

  public static getIsoDateString(date) {
    try {
      if (!date) {
        return null;
      }
      date = new Date(date);
      return date = date.toISOString().substring(0, 10);
    } catch (error) {
      return null;
    }
  }

  public static getIsoDateTimeString(date) {
    if (!date) {
      return null;
    }
    date = new Date(date);
    return date.toISOString().substring(0, 19);
  }

  public static camelize(str: string) {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
      if (+match === 0) {
        return '';
      } // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }
  
  public static async toBase64(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string')
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  //   convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //     const reader = new FileReader;
  //     reader.onerror = reject;
  //     reader.onload = () => {
  //         resolve(reader.result);
  //     };
  //     reader.readAsDataURL(blob);
  //   });

  // public static getDayName(day: number) {
  //   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   return days[day];
  // }

    // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 public static b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public static timeDiff(start, end) {
    let diff = this.compareTime(start, end, new Date())
    return diff;
  }

  private static compareTime(startTime: Date, endTime: Date, nowTime: Date) {
    let startHour = startTime.getHours()
    let startMinute = startTime.getMinutes()

    let endHour = endTime.getHours()
    let endMinute = endTime.getMinutes()

    let nowHour = nowTime.getHours()
    let nowMinute = nowTime.getMinutes()

    let start = false
    let end = false


    //start
    if (nowHour >= startHour) {
      if (nowHour > startHour) start = true;
      if (nowMinute >= startMinute) {
        start = true;
      }
    }

    //end
    if (nowHour <= endHour) {
      if (nowHour < startHour) end = true;
      if (nowMinute <= endMinute) {
        end = true
      }
    }

    if (start && end) return true
    else return false
  }

  public static splitTime(numberOfHours) {
    // https://www.google.com/search?q=ionic+input+position&oq=ionic+input+position&aqs=edge..69i57l2j69i59l2j69i65j69i60l2j69i61l2.3389j0j4&sourceid=chrome&ie=UTF-8
    var Days = Math.floor(numberOfHours / 24);
    var Remainder = numberOfHours % 24;
    var Hours = Math.floor(Remainder);
    var Minutes = Math.floor(60 * (Remainder - Hours));
    return ({ "Days": Days, "Hours": Hours, "Minutes": Minutes })
  }


}