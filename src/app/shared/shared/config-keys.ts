
export class AppRouteNames {
  public static Login = "login";
  public static UnAuthorized = "unauthorized";
  public static Home = "app/home";
  public static Signup = "signup";
  public static Profile = "app/settings/profile";
  public static Settings = "app/settings";
  public static ChangePassword = "app/changepassword";
  // public static Login = "dailysales";
}

export class StoreKeys {
  public static CurrentUser = "cmVzdQ==";
  public static Token = "c2FuZmlsMw==";
  public static Transaction = "nWuK9mMw==";
  public static Config = "config";
  public static DarkMode = "darkmode";
  public static Connectivity = "connectivity";
}

export class LoadingMessages {
  public static Loading = "Loading...";
  public static Saving = "Saving...";
  public static Deleting = "Deleting...";
  public static LoggingIn = "Logging In...";
  public static Verifying = "Verifying...";

}

export class Spinners {
  public static Lines = "lines";
  public static LinesSmall = "lines-small";
  public static Bubbles = "bubbles";
  public static Circles = "circles";
  public static Dots = "dots";

}

export class SysMessages {
  public static RecordSaved = "Record saved successfully.";
  public static RecordDeleted = "Record deleted successfully.";
  public static OperationError = "Error in performing operation. Check system logs for more details";
  public static Unauthorized = "You are not authorized to perform this action.";
  public static BadGateway = "Error connecting to server. Please check your internet connection.";
  public static NotFound = "Not Found. The resource you requested can not be found.";
  public static NotAllowed = "Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.";
  public static ConnectionLost = "Connection to server was lost.";
}

export class LookUpStores{
  public static Countries = "countries"

}

export class Enums {
  public static DayOfWeek = "DayOfWeek"
  public static Gender = "Gender"
  public static Title = "Title"
  public static Frequency="Frequency"
  public static SaleType="SaleType"

  // public static SocialMediaHandles: Enum[] = [
  //   { label: "Twitter", value: "Twitter", icon: "twitter-square" },
  //   { label: "Facebook", value: "Facebook", icon: "facebook-square" },
  //   { label: "Instagram", value: "Instagram", icon: "instagram-square" },
  //   { label: "Snapchat", value: "Snapchat", icon: "snapchat-square" },
  //   { label: "TikTok", value: "TikTok", icon: "tiktok" },
  //   { label: "Youtube", value: "Youtube", icon: "youtube-square" },
  //   { label: "Google Plus", value: "GooglePlus", icon: "google-plus-square" },
  //   { label: "Linked In", value: "LinkedIn", icon: "linkedin" },
  //   { label: "Spotify", value: "Spotify", icon: "spotify" }
  // ];

  // public static DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}

export interface MenuInfo {
  icon: any
  title: string
  route: string,
  color?: string
}

// export class APIs{
//   public static ReverseGeocoding=""
// }