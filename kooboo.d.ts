declare namespace KScript {
  interface k {
    ai: KScript.AI.KAI;
    /** The HTTP response object that is used to set data into http resposne stream */
    response: Response;
    /** ```ts
// Access to the http request data, query string, form or headers. Cookie is available from k.cookie.
var value = k.request.queryname;
var value = k.request.queryString.queryname;
var value = k.request.form.queryname;
```
 */
    request: Request;
    net: Kooboo.Sites.Scripting.Global.NET.KNET;
    inlineEditor: Kooboo.Sites.Scripting.Global.InlineEditor.KInline;
    module: Kooboo.Sites.ScriptModules.KModule;
    starter: Kooboo.Sites.Scripting.Global.Koobox.KKoobox;
    /** ```ts
// a temporary storage for small interactive information. Session does not persist
k.session.set("key", obj);
const back = k.session.get("key");
k.session.newkey = "value"; 
const value = k.session.key;
```
 */
    session: Session;
    /** Shared current context storage */
    state: kState;
    account: Kooboo.Sites.Scripting.Global.KAccount;
    logger: Kooboo.Sites.Scripting.Global.Logging.KLogger;
    template: Kooboo.Sites.Scripting.Global.KTemplate;
    cache: Kooboo.Sites.Scripting.KCache;
    page: Kooboo.Sites.Scripting.Global.KPage;
    /** The Kooboo website database with version control */
    site: kSiteDb;
    /** Provide read and write access to text or binary files under the site folder */
    file: FileIO;
    /** Get or set cookie value */
    cookie: Cookie;
    DB: Kooboo.Sites.Scripting.Global.Database.KDB;
    api: KScript.Api.KApi;
    utils: Kooboo.Sites.Scripting.Global.KUtils;
    google: Kooboo.Sites.Scripting.Global.Google.KGoogle;
    mail: Mail;
    commerce: KCommerce;
    integration: KScript.Integration.KIntegration;
    /** One way and two way encryption */
    security: Security;
    /** Cookie Consent management and others */
    privacy: Kooboo.Sites.Scripting.Global.KPrivacy;
    /** Analytics setting and reporting */
    analytics: Kooboo.Sites.Scripting.Global.Analytics.kAnalytics;
    integrateCommerce: Kooboo.IntegrateCommerce.KIntegrateCommerce;
    storage: Kooboo.Sites.Storage.KStorage;
    stapScript: Kooboo.Sites.Scripting.Extension.StapTest;
    payment: Kooboo.Sites.Payment.kPay;
    fromSite(nameOrId: any): k;
    t(value: string): string;
    t(value: string, params: any): string;
    label(NameOrId: string): string;
    label(NameOrId: string, params: any): string;
    /** return value to the caller */
    output(obj: any): void;
  }

  interface Response {
    meta: PageMeta;
    /** ```ts
// Print on output page. Will convert Non-Value type to Json format
k.response.write("hello world");
k.response.write(1234);
const obj = {name: "myname"};
k.response.write(obj);
```
 */
    write(value: any): void;
    /** ```ts
// set header value on output html page.
k.response.setHeader("ServerTwo", "powerful kooboo server");
k.response.setHeader("Access-Control-Allow-Origin", "*"
```
 */
    setHeader(key: string, value: string): void;
    /** // Redirect user to another url, url can be relative or absolute
```
k.response.redirect("/relativepath");
k.response.redirect("http://www.kooboo.com");
k.response.statusCode(301); 
```
If scheme not http or https like wechat://kooboo.com
```
k.response.redirect("wechat://kooboo.com",true); 
```
 */
    redirect(url: string, absolute?: boolean): void;
    /** ```ts
// Print object in Json format
const obj = {fieldone:"valueone", fieldtwo:"valuetwo"};
k.response.json(obj);
```
 */
    json(value: any): void;
    renderView(ViewBody: string): void;
    binary(contentType: string, bytes: number[]): void;
    binary(contentType: string, bytes: number[], filename?: string): void;
    /** ```ts
// Response a file from FileIO
k.response.file("1.jpg");
k.response.file("1.jpg","application/octet-stream");
k.response.file("1.jpg","application/octet-stream","newFileName.webp");
```
 */
    file(path: string, contentType?: string, fileName?: string): void;
    /** ```ts
// Set the status code
k.response.statusCode(301);
```
 */
    statusCode(code: number): void;
    /** ```ts
// Set the status code
k.response.statusCode(401);
```
 */
    unauthorized(): void;
    /** ```ts
// Redirect to 404 page
k.response.notFound();
```
 */
    notFound(): void;
    /** ```ts
// Excute another Url, and write the response within current context
k.response.execute("/anotherpage");
```
 */
    execute(url: string): void;
    stop(): void;
  }

  interface Request {
    /** ```ts
// Access to the http query string
var value = k.request.queryString.queryname;
```
 */
    queryString: KDictionary;
    /** ```ts
// Access to the http form field value
var value = k.request.form.queryname;
```
 */
    form: KDictionary;
    /** ```ts
// Form upload file collections
if (k.request.files.count > 0) {
    k.request.files.forEach((item) => {
        k.response.write(item.fileName);
        item.save(item.fileName);
    })
}
```
 */
    files: UploadFile[];
    /** The request text body */
    body: string;
    culture: string;
    model: any;
    /** HTTP Method like GET, POST, PUT */
    method: string;
    /** Client Requst IP (only IPv4) */
    clientIp: string;
    /** Client County info */
    clientCountry: Kooboo.Lib.GeoLocation.CountryLocationModel;
    headers: KDictionary;
    /** Current Requst URL */
    url: string;
    /** Host Name */
    host: string;
    /** Current Page */
    page: Kooboo.Sites.Models.Page;
    /** ```ts
var value = k.request.get("key");
var value = k.request.queryname;
```
 */
    get(key: string): string;
    setCulture(culture: string): void;
    resetCulture(): void;
  }

  interface Session {
    /** All keys in current session storage */
    keys: string[];
    /** All values in current session storage */
    values: any[];
    length: number;
    /** ```ts
// Set a Key Value in current session.
k.session.set("key", "value"); 
k.session.key="value";
```
 */
    set(key: string, value: any): void;
    /** ```ts
// get a session value
var value = k.session.get("key"); 
var value2 = k.session.key;
```
 */
    get(key: string): any;
    /** ```ts
// Check whether session has the key or not.
if (k.session.ContainsKey("key")){
// ...
}
```
 */
    containsKey(key: string): boolean;
    /** ```ts
// Remove item from session
k.session.remove("key");
```
 */
    remove(key: string): boolean;
    clear(): void;
  }

  interface kState {
    /** ```ts
// Set value into KView render engine
const obj = {name: "myname", fieldtwo: "value"};
k.state.set("key", obj);
```
 */
    set(key: string, value: any): void;
    /** ```ts
// Set or overwrite value into KView render engine current stack
const obj = {name: "myname", fieldtwo: "value"};
k.state.setCurrent("key", obj);
```
 */
    setCurrent(key: string, value: any): void;
    /** get existing object from state */
    get(key: string): any;
  }

  interface kSiteDb {
    /** append a version nr to image url for caching. Only valid when system set to image version cache */
    version: Kooboo.Sites.Scripting.Global.FileVersion;
    /** Access to current request information */
    info: Kooboo.Sites.Scripting.Global.InfoModel;
    webSite: Kooboo.Data.Models.WebSite;
    pages: KScript.Sites.PageRepository;
    helper: Kooboo.Sites.Scripting.Global.SiteItem.SiteHelper;
    editLog: Kooboo.Sites.Scripting.Global.SiteItem.KEditLog;
    user: KScript.SiteUser.KSiteUser;
    visitor: Kooboo.Sites.Scripting.Global.SiteItem.Visitor;
    diskSpace: Kooboo.Sites.Scripting.Global.SiteItem.DiskSpace;
    views: KScript.Sites.ViewRepository;
    layouts: KScript.Sites.LayoutRepository;
    htmlBlocks: KScript.Sites.HtmlBlockRepository;
    labels: KScript.Sites.LabelRepository;
    scripts: KScript.Sites.ScriptRepository;
    codes: KScript.Sites.CodeRepository;
    styles: KScript.Sites.StyleRepository;
    images: KScript.Sites.ImageRepository;
    files: KScript.Sites.FileRepository;
    routes: KScript.Sites.RouteObjectRepository;
    formValues: KScript.Sites.FormValuesRepository;
    settings: Kooboo.Sites.Scripting.Global.Site.kCoreSettings;
    dashBoard: K.DashBoard.KDashBoard;
    event: Kooboo.Sites.Scripting.Global.EventTask.KEvent;
    search: Kooboo.Sites.DataSources.Search;
    menus: Kooboo.Sites.Scripting.KMenus;
    multilingual: Kooboo.Sites.Scripting.Multilingual;
    list(): Kooboo.Sites.Scripting.ScriptModel.SiteSummaryViewModel[];
    isDomainExists(name: string): boolean;
    isNameExists(SiteName: string): boolean;
    get(SiteName: string): kSiteDb;
    createSite(siteName: string, fullDomain: string): kSiteDb;
    exportSite(nameOrId: string, copyMode: Kooboo.Sites.Sync.CopyMode, path: string): void;
    /** 
```
var siteUrl='http://testsite.kooboo.com';
var role='master';
var expire=new Date().getTime()+ 3600 * 1000 * 24 * 7;
k.site.createPublishUser(siteUrl,role,expire)
```
         */
    createPublishUser(siteUrl: string, role: string, expire: number): string;
    /** 
```
var siteUrl='http://testsite.kooboo.com';
k.site.enableCodeVideoLog(siteUrl)
```
         */
    enableCodeVideoLog(siteUrl: string): string;
    /** 
```
var siteUrl='http://testsite.kooboo.com';
var token='xxx' //create from k.site.createPublishUser;
k.site.importPublishUser(siteUrl,token)
```
         */
    importPublishUser(siteUrl: string, bearer: string): void;
    createSite(siteName: string, fullDomain: string, Binary: number[]): kSiteDb;
    getHomeUrl(): string;
    runJob(name: string): void;
    getJob(name: string): SiteJobStatus;
  }

  interface FileIO {
    resumableUpload: ResumableUpload;
    /** ```ts
// Write the text to the file name. When the target exists, it will be overwritten.
 k.file.write("folder\filename.txt", "content to write to text file");
var info = k.file.write("rootfile.txt", "content to write to text file");
```
 */
    write(fileName: string, content: string): FileInfo;
    /** ```ts
// Write the text to the file name. When the target exists, it will be overwritten.
 k.file.write("folder\filename.txt", "content to write to text file");
var info = k.file.write("rootfile.txt", "content to write to text file");
```
 */
    write(fileName: string, content: string, WithAuthorInfo: boolean): FileInfo;
    /** ```ts
// Write an array of bytes to the site disk folder
if (k.request.method="POST"){ 
	if (k.request.files.length > 0){ 
        var file = k.request.files[0]; 
        var info = k.file.writeBinary(file.fileName, file.bytes); 
    }
}
```
 */
    writeBinary(fileName: string, binary: number[]): FileInfo;
    writeBinary(fileName: string, binary: number[], WithAuthorInfo: boolean): FileInfo;
    /** ```ts
// Write the text to the file name. When the target does NOT exist, it will be created
k.file.append("filename.txt", "content to append to text file");
```
 */
    append(FileName: string, content: string): void;
    toValidPath(input: string): string;
    /** ```ts
// return the relative url path to access the file
k.file.url("image1.jpg");
```
 */
    url(filename: string): string;
    /** ```ts
// Read all the text of the file
var value = k.file.read("filename.txt");
```
 */
    read(FileName: string): string;
    /** ```ts
// read the file into a byte array
var bytes = k.file.readBinary("file.pdf"); 
var info = k.file.writeBinary("newname.pdf", bytes);
```
 */
    readBinary(FileName: string): number[];
    /** ```ts
// Check whether the file exists or not, filename can be:/folder/filename.txt.
if (k.file.exists("filename.txt")){
  // file exists
}
```
 */
    exists(FileName: string): boolean;
    folderExists(path: string): boolean;
    /** ```ts
// Load file by relative URL or file name, return FileInfo object that contains URL, size and FullPath.
k.file.load("image1.jpg")
```
 */
    load(FileName: string): FileInfo;
    /** ```ts
// Load file by relative URL or file name, return FileInfo object that contains URL, size and FullPath.
k.file.load("image1.jpg")
```
 */
    load(FileName: string, IncludeAuthor: boolean): FileInfo;
    /** ```ts
// Load the file, return FileInfo object that contains URL, size and FullPath.
k.file.get("image1.jpg")
```
 */
    get(FileName: string): FileInfo;
    /** ```ts
// Load the file, return FileInfo object that contains URL, size and FullPath.
k.file.get("image1.jpg")
```
 */
    get(FileName: string, IncludeAuthor: boolean): FileInfo;
    /** ```ts
// Rename the file
k.file.rename('1.jpg','2.jpg');
```
 */
    rename(oldName: string, newName: string): void;
    /** ```ts
// Copy the file or directory
k.file.copy('1.jpg','2.jpg');
k.file.copy('subFolder','subFolder2');
```
 */
    copy(oldName: string, newName: string): void;
    /** ```ts
// Delete the file
k.file.delete("filename.txt");
```
 */
    delete(FileName: string): void;
    /** ```ts
// Return all files in all folders, return an Array of FileInfo
var allfiles= k.file.getAllFiles();
```
 */
    getAllFiles(): FileInfo[];
    /** ```ts
// Return all files in all folders, return an Array of FileInfo
var allfiles= k.file.getAllFiles();
```
 */
    getAllFiles(IncludeAuthor: boolean): FileInfo[];
    /** ```ts
// Return all files in the provided folder, return an Array of FileInfo
var folderFiles = k.file.folderFiles(k.request.folder);
```
 */
    folderFiles(folder: string, options?: KScript.Files.SearchFolderOptions): FileInfo[];
    /** ```ts
// List sub folders under current folder, return an Array of FolderInfo
var subfolders = k.file.subFolders(k.request.folder);
```
 */
    subFolders(folder?: string): FolderInfo[];
    /** ```ts
// create a sub folder under current folder
k.file.createFolder("sub", "parent");
```
 */
    createFolder(Folder: string, ParentFolder: string): void;
    /** ```ts
// create a sub folder under root folder
k.file.createFolder("folder");
```
 */
    createFolder(Folder: string): void;
    /** ```ts
// Rename the folder
k.file.renameFolder('img','img2');
```
 */
    renameFolder(oldFolder: string, newFolder: string): void;
    /** ```ts
// Delete a folder and all sub directories and files in it.
k.file.deleteFolder(k.request.deleteFolder);
```
 */
    deleteFolder(Folder: string): void;
  }

  interface Cookie {
    /** All keys in current cookie collection */
    keys: string[];
    /** All values in current cookie collection */
    values: string[];
    /** ```ts
// set a cookie expire in days
k.cookie.set("cookiename", "cookievalue", 30);
```
 */
    set(name: string, value: string, days: number): void;
    /** ```ts
// set a cookie expire in days
k.cookie.set("cookiename", "cookievalue", 30,".kooboo.com");
```
 */
    set(name: string, value: string, days: number, domain: string): void;
    /** ```ts
// set a cookie with an expiration time in minutes
k.cookie.setByMinutes("cookiename", "value", 240);
```
 */
    setByMinutes(name: string, value: string, mins: number): void;
    /** ```ts
// set a cookie that default expires in 1 day.
k.cookie.set("cookiename", "cookie value")
```
 */
    set(name: string, value: string): void;
    /** ```ts
// Get the cookie value by name
const cookievalue = k.cookie.get("cookiename");
const cookievalue2 = k.cookie.cookiename;
```
 */
    get(Name: string): string;
    /** ```ts
// check whether cookie has the key or not
if (k.cookie.containsKey("key"))
{
  //has value
}
```
 */
    containsKey(key: string): boolean;
    /** ```ts
// Remove cookie by key
k.cookie.remove("key");
```
 */
    remove(key: string): boolean;
    /** ```ts
// Remove cookie by key
k.cookie.remove("key",".kooboo.com");
```
 */
    remove(key: string, domain: string, sameSite?: boolean): boolean;
    /** ```ts
// delete all cookies
k.cookie.clear();
```
 */
    clear(): void;
  }

  interface Mail {
    utility: Kooboo.Sites.Scripting.Global.Mail.MailUtility;
    /** Send out emails */
    smtp: Kooboo.Sites.Scripting.Global.Mail.SMTPSender;
    /** Collect messages from IMAP server. Only collect inbox folder. */
    imap: Kooboo.Sites.Scripting.Global.IMAP.ImapCollector;
    amazonses: Kooboo.Sites.Scripting.Global.Mail.Amazonses.Amazonses;
    spamassassin: Kooboo.Sites.Scripting.Global.Mail.Spamassassin;
    module: Kooboo.Sites.Scripting.Global.Mail.KMailModule;
    /** create a new message for sending */
    createMessage(): Kooboo.Sites.Scripting.Global.Mail.Models.MailMessage;
    /** create a new SMTP Server setting */
    createSmtpServer(): Kooboo.Sites.Scripting.Global.Mail.SmtpServer;
  }

  interface KCommerce {
    category: KScript.Commerce.KCategory;
    product: KScript.Commerce.KProduct;
    cart: KScript.Commerce.KCart;
    order: KScript.Commerce.KOrder;
    customer: KScript.Commerce.KCustomer;
    loyalty: KScript.Commerce.KLoyalty;
    discount: KScript.Commerce.KDiscount;
    shipping: KScript.Commerce.KShipping;
    address: KScript.Commerce.KAddress;
    membership: KScript.Commerce.KMembership;
    wishlist: KScript.Commerce.KWishlist;
    currency: KScript.Commerce.KCurrency;
    settings: Kooboo.Sites.Commerce.Settings;
  }

  interface Security {
    jwt: Kooboo.Sites.Scripting.Global.Jwt.kJwt;
    rsa: Kooboo.Lib.Security.RSAEncryption;
    /** ```ts
// Compute a 32 length text string value
const input = ""myvalue"";
const md5value = k.security.hashGuid(input);

//Compute from file io 
const md5value = k.security.hashGuid("folder/1.jpg",{source:"FileIo"});
```
 */
    hashGuid(input: string, options?: Kooboo.Sites.Scripting.Global.Models.HashGuidOptions): string;
    /** ```ts
// Compute a 32 length text string value
const input = "myvalue";
const md5value = k.security.md5(input);
```
 */
    md5(input: string): string;
    /** ```ts
// Compute a 40 length text string value
const input = "myvalue";
const shavalue = k.security.sha1(input);
```
 */
    sha1(input: string): string;
    /** ```ts
// Compute a 512 bits long text string value
const input = "myvalue";
const shavalue = k.security.sha512(input);
```
 */
    sha512(input: string): string;
    /** ```ts
// Compute a 256 bits long text string value
const input = "myvalue";  
const shaHexValue = k.security.sha256(input);
```
 */
    sha256(input: string): string;
    /** ```ts
// Compute a 256 bits long bytes array value
const input = "myvalue";  
const shaBinaryValue = k.security.sha256Binary(input);
```
 */
    sha256Binary(input: string): number[];
    /** ```ts
// Two-way encryption
const input = "myvalue"; 
const key = "hashkey";  
const encrptyValue = k.security.encrypt(input, key);   
const decryptValue = k.security.decrypt(encrptyValue, key);
```
 */
    encrypt(input: string, key: string): string;
    /** ```ts
// Two-way encryption
const input = "myvalue"; 
const key = "hashkey";  
const encrptyValue = k.security.encrypt(input, key);   
const decryptValue = k.security.decrypt(encrptyValue, key);
```
 */
    decrypt(input: string, key: string): string;
    /** ```ts
// Two-way encryption
const input = "myvalue"; 
const key = "hashkey";  
const encrptyValue = k.security.encrypt(input, key);   
const decryptValue = k.security.decrypt(encrptyValue, key);
```
 */
    aesEncrypt(input: string, key: string): string;
    /** ```ts
// Two-way encryption
const input = "myvalue"; 
const key = "hashkey";  
const encrptyValue = k.security.encrypt(input, key);   
const decryptValue = k.security.decrypt(encrptyValue, key);
```
 */
    aesDecrypt(input: string, key: string): string;
    /** ```ts
// Convert to base64 format string
k.security.toBase64("input");
```
 */
    toBase64(input: string): string;
    /** ```ts
/// Convert to base64 format byte[]
const bytes = k.file.readBinary("a.jpg");
const base64 = k.security.toBase64(bytes);
```
 */
    toBase64(input: number[]): string;
    /** ```ts
// Convert base64 string to byte[]
const payload = k.security.decodeBase64("aGVsbG8=")
```
 */
    decodeBase64(input: string): number[];
    /** ```ts
// Convert from base64 string
const payload = k.security.fromBase64("aGVsbG8=")
```
 */
    fromBase64(base64string: string): string;
    /** Generate a new Guid */
    newGuid(): string;
    /** Generate a new Guid, encrypt to short length */
    shortGuid(): string;
    /** Hash a password using built-in best practice */
    hashPassword(password: string): string;
    /** Verify a password again hashed value */
    verifyPassword(password: string, saltdpassword: string): boolean;
    hmacSha256(input: string, key: string): string;
    hmacSha1(input: string, key: string): string;
    hmacMd5(input: string, key: string): string;
    sha256Sign(privateKey: string, value: string): string;
    newSnowId(): number;
  }

  interface PageMeta {
    title: string;
    setMeta(Name: string, content: string): void;
    setMeta(Name: string, HttpEquiv: string, CharSet: string, content: string): void;
    setCustomerHeader(HeaderString: string): void;
    getMeta(Name: string): MetaItem;
  }

  interface KDictionary {
    keys: string[];
    values: string[];
    length: number;
    get(key: string): string;
    add(key: string, value: string): void;
    set(key: string, value: string): void;
    clear(): void;
    containsKey(key: string): boolean;
    remove(key: string): boolean;
    contains(key: any): boolean;
    add(key: any, value: any): void;
    remove(key: any): void;
  }

  interface UploadFile {
    contentType: string;
    name: string;
    /** Uploaded file name */
    fileName: string;
    bytes: number[];
    /** ```ts
// Save uploaded file into disk
k.request.files.forEach((item) => {
    k.response.write(item.fileName);
    item.save(item.fileName);
})
```
 */
    save(filename: string): FileInfo;
  }

  interface Curl {
    /** ```ts
// Get data string from the url and return a CurlResponse
var webcontent = k.net.url.get("http://www.kooboo.com",{'Authentication':'Bearer xxx'}, {'name':'value'});
```
 */
    get(url: string, headers: any, cookies: any): CurlResponse;
    /** ```ts
// Post data to remote url and return a CurlResponse
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication':'Bearer xxxx'}, {'name':'value'})););
```
 */
    post(url: string, data: string, headers: any, cookies: any): CurlResponse;
    /** ```ts
// Put data to remote url and return a CurlResponse
var data = "name=myname&field=value"; 
k.net.url.put("http://www.kooboo.com/fakereceiver", data,{'Authentication':'Bearer xxxx'}, {'name':'value'})););
```
 */
    put(url: string, data: string, headers: any, cookies: any): CurlResponse;
    /** ```ts
// Delete data to remote url and return a CurlResponse
var data = "name=myname&field=value"; 
k.net.url.delete("http://www.kooboo.com/fakereceiver", data,{'Authentication':'Bearer xxxx'}, {'name':'value'})););
```
 */
    delete(url: string, data: string, headers: any, cookies: any): CurlResponse;
    /** ```ts
// Patch data to remote url and return a CurlResponse
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,{'Authentication':'Bearer xxxx'}, {'name':'value'}););
```
 */
    patch(url: string, data: string, headers: any, cookies: any): CurlResponse;
    /** ```ts
// Post form data to remote url and return a CurlResponse
var data = {
    name:'abc',
    age:123
}
k.net.url.postform("http://www.kooboo.com/fakereceiver", data,{'Authentication':'Bearer xxxx'}, {'name':'value'});
```
 */
    postform(url: string, data: any, headers: any, cookies: any): CurlResponse;
    /** ```ts
// Get data string from the url
var webcontent = k.net.url.get("http://www.kooboo.com");
```
 */
    get(url: string): string;
    /** ```ts
// Get data string from remote url using HTTP Bearer authentication
var webcontent = k.net.url.get("http://www.kooboo.com", "token");
```
 */
    get(url: string, token: string): string;
    /** ```ts
// Get data string from remote url using HTTP Basic authentication
var webcontent = k.net.url.get("http://www.kooboo.com", "username", "password");
```
 */
    get(url: string, username: string, password: string): string;
    /** ```ts
// Get data string from the url
var webcontent = k.net.url.get("http://www.kooboo.com",{'Authentication','Bearer xxx'});
```
 */
    get(url: string, headers: any): string;
    /** ```ts
// Get data string from the url and return JavaScript object.
var webcontent = k.net.url.get("http://www.kooboo.com");
```
 */
    getAsObject(url: string): any;
    /** ```ts
// Get data string from remote url using HTTP Bearer authentication and return JavaScript object.
var webcontent = k.net.url.get("http://www.kooboo.com", "token");
```
 */
    getAsObject(url: string, token: string): any;
    /** ```ts
// Get data string from remote url using HTTP Basic authentication and return JavaScript Object
var webcontent = k.net.url.get("http://www.kooboo.com", "username", "password");
```
 */
    getAsObject(url: string, username: string, password: string): any;
    /** ```ts
// Get data string from the url and return JavaScript Object
var webcontent = k.net.url.get("http://www.kooboo.com",{'Authentication','Bearer xxx'});
```
 */
    getAsObject(url: string, headers: any): any;
    /** ```ts
// Get data string from the url and return binary.
var binary = k.net.url.getAsBinary("http://www.kooboo.com");
```
 */
    getAsBinary(url: string): number[];
    /** ```ts
// Get data string from remote url using HTTP Bearer authentication and return binary.
var binary = k.net.url.getAsBinary("http://www.kooboo.com", "token");
```
 */
    getAsBinary(url: string, token: string): number[];
    /** ```ts
// Get data string from remote url using HTTP Basic authentication and return binary.
var binary = k.net.url.getAsBinary("http://www.kooboo.com", "username", "password");
```
 */
    getAsBinary(url: string, username: string, password: string): number[];
    /** ```ts
// Get data string from the url and return binary.
var binary = k.net.url.getAsBinary("http://www.kooboo.com",{'Authentication','Bearer xxx'});
```
 */
    getAsBinary(url: string, headers: any): number[];
    /** ```ts
// Get data string from remote url and deserialize the string as a JSON object.
var webcontent = k.net.url.getJson("http://www.kooboo.com");
```
 */
    getJson(url: string): any;
    /** ```ts
// Get data string from remote url using HTTP Basic authentication, and deserialize the string as a JSON object
var webcontent = k.net.url.getJson("http://www.kooboo.com","xxx");
```
 */
    getJson(url: string, token: string): any;
    /** ```ts
// Get data string from remote url using HTTP Basic authentication, and deserialize the string as a JSON object
var webcontent = k.net.url.getJson("http://www.kooboo.com","admin","abc123");
```
 */
    getJson(url: string, username: string, password: string): any;
    /** ```ts
// Get data string from remote url and deserialize the string as a JSON object
var webcontent = k.net.url.getJson("http://www.kooboo.com",{'Authentication','Bearer xxxx'});
```
 */
    getJson(url: string, headers: any): any;
    /** ```ts
// Post data to remote url
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data);
```
 */
    post(url: string, data: string): string;
    /** ```ts
// Post data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    post(url: string, data: string, token: string): string;
    /** ```ts
// Post data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    post(url: string, data: string, userName: string, password: string): string;
    /** ```ts
// Post data to remote url
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    post(url: string, data: string, headers: any): string;
    /** ```ts
// Post data to remote url and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data);
```
 */
    postAsObject(url: string, data: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    postAsObject(url: string, data: string, token: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    postAsObject(url: string, data: string, userName: string, password: string): any;
    /** ```ts
// Post data to remote url and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    postAsObject(url: string, data: string, headers: any): any;
    /** ```ts
// Post data to remote url and return binary
var data = "name=myname&field=value"; 
k.net.url.postAsBinary("http://www.kooboo.com/fakereceiver", data);
```
 */
    postAsBinary(url: string, data: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return binary
var data = "name=myname&field=value"; 
k.net.url.postAsBinary("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    postAsBinary(url: string, data: string, token: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return binary
var data = "name=myname&field=value"; 
k.net.url.postAsBinary("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    postAsBinary(url: string, data: string, userName: string, password: string): any;
    /** ```ts
// Post data to remote url and return binary
var data = "name=myname&field=value"; 
k.net.url.postAsBinary("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    postAsBinary(url: string, data: string, headers: any): any;
    /** ```ts
// Post data to remote url
var data = {
    name:'abc',
    age:23
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data);
```
 */
    postData(url: string, data: any): string;
    /** ```ts
// Post data to remote url using HTTP Bearer authentication
var data = {
    name:'abc',
    age:23
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    postData(url: string, data: any, token: string): string;
    /** ```ts
// Post data as a Json string to remote url using HTTP Basic authentication
var data = {
    name:'abc',
    age:23
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    postData(url: string, data: any, userName: string, password: string): string;
    /** ```ts
// Post data as a Json string to remote url
var data = {
    name:'abc',
    age:23
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'});
```
 */
    postData(url: string, data: any, headers: any): string;
    postDataAsObject(url: string, data: any): any;
    /** ```ts
// Post data to remote url
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data);
```
 */
    put(url: string, data: string): string;
    /** ```ts
// Post data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    put(url: string, data: string, token: string): string;
    /** ```ts
// Post data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    put(url: string, data: string, userName: string, password: string): string;
    /** ```ts
// Post data to remote url
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    put(url: string, data: string, headers: any): string;
    /** ```ts
// Post data to remote url and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data);
```
 */
    putAsObject(url: string, data: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    putAsObject(url: string, data: string, token: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    putAsObject(url: string, data: string, userName: string, password: string): any;
    /** ```ts
// Post data to remote url and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    putAsObject(url: string, data: string, headers: any): any;
    /** ```ts
// Post data to remote url
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data);
```
 */
    delete(url: string, data: string): string;
    /** ```ts
// Post data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    delete(url: string, data: string, token: string): string;
    /** ```ts
// Post data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    delete(url: string, data: string, userName: string, password: string): string;
    /** ```ts
// Post data to remote url
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    delete(url: string, data: string, headers: any): string;
    /** ```ts
// Post data to remote url and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data);
```
 */
    deleteAsObject(url: string, data: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    deleteAsObject(url: string, data: string, token: string): any;
    /** ```ts
// Post data to remote url using HTTP Basic authentication and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    deleteAsObject(url: string, data: string, userName: string, password: string): any;
    /** ```ts
// Post data to remote url and return a JsonObject
var data = "name=myname&field=value"; 
k.net.url.post("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    deleteAsObject(url: string, data: string, headers: any): any;
    /** ```ts
// Patch data to remote url
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data);
```
 */
    patch(url: string, data: string): string;
    /** ```ts
// Patch data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    patch(url: string, data: string, token: string): string;
    /** ```ts
// Patch data to remote url using HTTP Basic authentication
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    patch(url: string, data: string, userName: string, password: string): string;
    /** ```ts
// Patch data to remote url
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    patch(url: string, data: string, headers: any): string;
    /** ```ts
// Patch data to remote url and return JavaScript Object.
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data);
```
 */
    patchAsObject(url: string, data: string): any;
    /** ```ts
// Patch data to remote url using HTTP Basic authentication return JavaScript Object.
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    patchAsObject(url: string, data: string, token: string): any;
    /** ```ts
// Patch data to remote url using HTTP Basic authentication return JavaScript Object.
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    patchAsObject(url: string, data: string, userName: string, password: string): any;
    /** ```ts
// Patch data to remote url return JavaScript Object.
var data = "name=myname&field=value"; 
k.net.url.patch("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'}););
```
 */
    patchAsObject(url: string, data: string, headers: any): any;
    /** ```ts
// Patch data to remote url
var data = {
    name:'abc',
    age:23
}
k.net.url.patchData("http://www.kooboo.com/fakereceiver", data);
```
 */
    patchData(url: string, data: any): string;
    /** ```ts
// Patch data to remote url using HTTP Bearer authentication
var data = {
    name:'abc',
    age:23
}
k.net.url.patchData("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    patchData(url: string, data: any, token: string): string;
    /** ```ts
// Patch data as a Json string to remote url using HTTP Basic authentication
var data = {
    name:'abc',
    age:23
}
k.net.url.patchData("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    patchData(url: string, data: any, userName: string, password: string): string;
    /** ```ts
// Patch data as a Json string to remote url
var data = {
    name:'abc',
    age:23
}
k.net.url.patchData("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'});
```
 */
    patchData(url: string, data: any, headers: any): string;
    /** ```ts
// Post form data to remote url
var data = '{"name":"abc", "age":23}'
k.net.url.postData("http://www.kooboo.com/fakereceiver", data);
```
 */
    postform(url: string, data: string): string;
    /** ```ts
// Post form data to remote url
var data = {
    name:'abc',
    age:123
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data);
```
 */
    postform(url: string, data: any): string;
    /** ```ts
// Post form data to remote url
var data = '{"name":"abc", "age":23}'
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    postform(url: string, data: string, token: string): string;
    /** ```ts
// Post form data to remote url
var data = {
    name:'abc',
    age:123
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,'xxx');
```
 */
    postform(url: string, data: any, token: string): string;
    /** ```ts
// Post form data to remote url
var data = '{"name":"abc", "age":23}'
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    postform(url: string, data: string, userName: string, password: string): string;
    /** ```ts
// Post form data to remote url
var data = {
    name:'abc',
    age:123
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,'admin','abc123');
```
 */
    postform(url: string, data: any, userName: string, password: string): string;
    /** ```ts
// Post form data to remote url
var data = '{"name":"abc", "age":23}'
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'});
```
 */
    postform(url: string, data: string, headers: any): string;
    /** ```ts
// Post form data to remote url
var data = {
    name:'abc',
    age:123
}
k.net.url.postData("http://www.kooboo.com/fakereceiver", data,{'Authentication','Bearer xxxx'});
```
 */
    postform(url: string, data: any, headers: any): string;
    /** ```ts
// Download zip package by url.
k.net.url.downloadZip("http://www.kooboo.com/fakefile.zip")
```
 */
    downloadZip(url: string): void;
    /** ```ts
// Send message to remote url
var requestMessage = k.request;
var url = "www.test.com"
var method = "GET"
var params = { "a":"1", "b":"2"}
var headers = { "a":"1", "b":"2"}
var body = { "a":"1", "b":"2"}
var data = {
        url,
        method,
        params,
        headers,
        body,
        multipartpartkey
    }
k.net.url.SendMessage(requestMessage, data);
```
 */
    sendMessage(requestMessage: any, data: any): CurlResponse;
  }

  interface IDatabase {
    [key:string]: KTable;
    /** Return the kScript database table object, if the table is not exists, it will be created. */
    getTable(Name: string): ITable;
    getTables(): string[];
    operators(): Operators;
  }

  interface KeyValue {
    key: string;
    value: string;
  }

  interface SiteJobStatus {
    isRunning: boolean;
    lastExecuteTime?: Date;
  }

  interface FileInfo {
    name: string;
    fullName: string;
    size: number;
    stringSize: string;
    relativeUrl: string;
    absoluteUrl: string;
    url: string;
    lastModified: Date;
    authorUserName: string;
  }

  interface FolderInfo {
    name: string;
    fullName: string;
  }

  interface ResumableUpload {
    /** Create a resumable upload task
```
var name = k.request.name; //filename
var size = k.request.size; //filesize
var chunkSize = 1024 * 1024;
var task = k.file.resumableUpload.create(name, size, chunkSize);
``` */
    create(name: string, size: number, chunkSize?: number): ResumableUploadTask;
    /** Get resumable upload task
```
var taskId = k.request.task; //task id
var task = k.file.resumableUpload.get(taskId);
```    
     */
    get(id: string): ResumableUploadTask;
    /** Remove resumable upload task
```
var taskId = k.request.task; //task id
var task = k.file.resumableUpload.remove(taskId);
```    
     */
    remove(id: string): void;
  }

  interface MongoDatabase extends IDatabase {
    operators(): Operators;
    getTable(Name: string): ITable;
    /** ```ts
// about mongo command you can see 
// https://docs.mongodb.com/manual/reference/command/
// insert
k.DB.mongo.runCommand({
    insert:'user',
    documents:[
        {name:'jobs',age:23}
    ]
})

// find
const result= k.DB.mongo.runCommand({
   find:'user'
});
k.response.write(result);
```
 */
    runCommand(commandObject: CommandObject): CommandResult;
    getTables(): string[];
  }

  interface RedisConnection {
    getDatabase(db: number): RedisDatabase;
  }

  interface kKeyValue {
    keys: string[];
    values: any[];
    length: number;
    /** ```ts
k.DB.keyValue.set("key", "value");
var value = k.DB.keyValue.get("key");
// or
var value = k.DB.keyValue.key;
```
 */
    set(key: string, value: string): void;
    /** ```ts
k.DB.keyValue.set("key", "value");
var value = k.DB.keyValue.get("key");
// or
var value = k.DB.keyValue.key;
```
 */
    get(key: string): Kooboo.Sites.Scripting.Global.Database.KeyValueObject;
    contains(key: string): boolean;
    remove(key: string): boolean;
  }

  interface Office {
    /** ```ts
// Operations on excel(.xls|.xlsx) file.
// read excel from file;
const file = 'XLSX.xlsx';
const sheetNames = k.office.excel.readSheetNames(file);
const objects = k.office.excel.readAsObjects(file,'sheet1');
const objects2 = k.office.excel.readAsObjects(file,'sheet1',{firstColumnIndex:0,lastColumnIndex:1});
const arrays =  k.office.excel.readAsArrays(file,'sheet1');
const arrays2 =  k.office.excel.readAsArrays(file,'sheet1',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastRowIndex:3});
const rowData =  k.office.excel.getWorkBook(file).sheets[0].rows[1].data;
const cellData =  k.office.excel.getWorkBook(file).sheets[0].rows[1].cells[0].value;
k.response.json({sheetNames,objects,objects2,arrays,arrays2,rowData,cellData});

// read excel from bytes;
const fileName2 = 'XLS.xls';
const buffer = k.file.readBinary(fileName2);
const sheetNamesFromBytes = k.office.excel.readSheetNamesFromBytes(buffer, '.xls');
const objectsFromBytes = k.office.excel.readAsObjectsFromBytes(buffer, '.xls','Sheet1',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastRowIndex:4});
const arraysFromBytes = k.office.excel.readAsArraysFromBytes(buffer, '.xls','Sheet3',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastRowIndex:3});
const opObjectDataFromBytes = k.office.excel.getWorkBookFromBytes(buffer,'.xls').sheets[1].getObjectData({firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastRowIndex:3});
k.response.json({sheetNamesFromBytes,objectsFromBytes,arraysFromBytes,opObjectDataFromBytes});

//export excel by objects json;
var book = k.office.excel.createNewWorkbook(".xls");
var objects = [{ "Id": "1", "Name": "My Name", "Age": 12, "CreationTime": "2022-12-11 20:00:00" }, { "Id": "2", "Name": "His Name", "Age": 22, "CreationTime": "2021-12-12 20:09:00" }];
var objects2 = [{ "1": "1", "2": "My Name"}, { "1": "2", "2": "His Name"}];
book.createSheet("Sheet1").fillObjectData(JSON.stringify(objects));
book.createSheet("Sheet2").fillObjectData(JSON.stringify(objects2));
var buffer = book.readAsBytes();
var contentType = book.getExtentionName() == ".xls"? 
"application/vnd.ms-excel":
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
k.response.binary(contentType,buffer,"my excel.xls");

//export excel with arrays;var book = k.office.excel.createNewWorkbook(".xlsx");
var arrays = [["Id","Name","Age"],["1","test",3],["2","test2",33]];
var arrays2 = [[1,2,3.3],["1","test",3],["2","test2",33]];
book.createSheet("Sheet1").fillArrayData(arrays);
book.createSheet("Sheet2").fillArrayData(arrays2);
var buffer = book.readAsBytes();
var contentType = book.getExtentionName() == ".xls"? 
"application/vnd.ms-excel":
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
k.response.binary(contentType,buffer,"My excel.xlsx");
```
 */
    excel: Excel;
  }

  interface MetaItem {
  }

  interface CurlResponse {
    data: number[];
    headers: any;
    httpStatusCode: number;
    httpStatusCodeString: string;
    size: number;
    requestTime: number;
    errorMessage: string;
    bodyString(): string;
  }

  interface ITable {
    /** ```ts
// Add an object into database table. If the table does not have the fields, the table schema will be automatically updated with columns.
var obj = {fieldone: "value one", fieldtwo: "value two"};
k.DB.IndexedDb.tablename.add(obj);
```
 */
    add(value: any): any;
    /** Return all items */
    all(): IDynamicTableObject[];
    /** ```ts
// Append an object to database table. This is the same as "add" except that it will not update table schema when the object contains fields not defined in the table schema.
var obj = {fieldone: "value one", fieldtwo: "value two"};
var returnid = k.DB.indexedDb.tablename.append(obj);
```
 */
    append(value: any): any;
    /** create additional index */
    createIndex(fieldname: string): void;
    /** ```ts
// Delete an item from database based on id or primary key
k.DB.indexedDb.tablename.delete(key);
```
 */
    delete(id: any): void;
    /** ```ts
// Return the first itme that match query condition
// available operators: ==,  >=,  >,  <,  <=, contains, startwith 
var table = k.DB.indexedDb.tablename;
var items = table.find("name == 'matchedvalue'"); 
var items = table.find("number>=123"); 
var items = table.find("number >=123&&name=='matchedvalue'"); 
var items = table.find("name contains 'matchedvalue'"); 
var items = table.find("name startwith 'matchedvalue'");
```
 */
    find(query: string): IDynamicTableObject;
    /** ```ts
// return the first item that has field value equal the match value
var item = k.DB.indexedDb.tablename.find("fieldname", "matchvalue");
```
 */
    find(fieldName: string, matchValue: any): IDynamicTableObject;
    /** ```ts
// return the first item that has field value equal the match value
const { GT } = k.DB.indexedDb.operators();      
var item = k.DB.indexedDb.tablename.find({age:{[GT]:23}});
```
 */
    find(filter: any): IDynamicTableObject;
    /** ```ts
// Search all items based on query condition
// available operators: ==,  >=,  >,  <,  <=, contains, startwith 
var table = k.DB.indexedDb.tablename;
var items = table.findAll("name == 'matchedvalue'"); 
var items = table.findAll("number>=123"); 
var items = table.findAll("number >=123&&name=='matchedvalue'"); 
var items = table.findAll("name contains 'matchedvalue'"); 
var items = table.findAll("name startwith 'matchedvalue'");
```
 */
    findAll(query: string): IDynamicTableObject[];
    /** ```ts
// return all items that have the field value equal the match value
var items = k.DB.indexedDb.tablename.findAll("fieldname", "matchvalue");
```
 */
    findAll(field: string, value: any): IDynamicTableObject[];
    /** ```ts
// Search all items based on query condition
const { GT } = k.DB.indexedDb.operators();      
var item = k.DB.indexedDb.tablename.findAll({age:{[GT]:23}});
```
 */
    findAll(filter: any): IDynamicTableObject[];
    /** ```ts
// return counter based on the query condition
```
 */
    count(query: string): number;
    /** ```ts
// return counter based on the query filter
```
 */
    count(filter: any): number;
    /** get an item based on Id or primary key */
    get(id: any): IDynamicTableObject;
    query(): ITableQuery;
    /** ```ts
// Return the query object for further operations like paging.
use the same query syntax as find or findAll
```
 */
    query(query: string): ITableQuery;
    query(filter: any): ITableQuery;
    /** ```ts
// update an item
var table = k.DB.indexedDb.tablename;
var obj = {fieldone: "value one"};
var id = table.add(obj);   
var item = table.get(id);
item.fieldone = "new value";   
table.update(item);
```
 */
    update(newvalue: any): void;
    /** ```ts
// update an item, key must be the system default Guid key or the key value of primary key field.
var table = k.DB.indexedDb.tablename;
var obj = {fieldone: "value one"};
var id = table.add(obj);   
obj.fieldone = "new value";   
table.update(id, obj);
```
 */
    update(id: any, newvalue: any): void;
    /** ```ts
// query pagination from database.
var pagination = k.DB.indexedDb.tablename.pagination(1,20)
pagination object like:
{
   "totalCount": 2,
   "totalPage": 1,
   "pageSize": 20,
   "currentPage": 1,
   "list": [...pageData]
}
```
 */
    pagination(index: number, size: number): Kooboo.Sites.Scripting.Global.Models.PaginationModel;
    /** ```ts
// query pagination from database.
var pagination = k.DB.indexedDb.tablename.pagination(1,20,"name='jobs'")
pagination object like:
{
   "totalCount": 2,
   "totalPage": 1,
   "pageSize": 20,
   "currentPage": 1,
   "list": [...pageData]
}
```
 */
    pagination(index: number, size: number, where: string): Kooboo.Sites.Scripting.Global.Models.PaginationModel;
    /** Return editing history of this object */
    getLogs(id: any): Kooboo.Sites.Scripting.ChangeLog[];
    /** Get object based on the log id */
    getByLog(LogId: number): IDynamicTableObject;
  }

  interface Operators {
    AND: string;
    OR: string;
    EQ: string;
    NE: string;
    GT: string;
    GTE: string;
    LT: string;
    LTE: string;
    STARTS_WITH: string;
    CONTAINS: string;
  }

  interface KTable extends ITable {
    /** ```ts
// Add an object into database table. If the table does not have the fields, the table schema will be automatically updated with columns.
    var obj = {fieldone: "value one", fieldtwo: "value two"};
    k.DB.indexedDb.tablename.add(obj);
```
 */
    add(value: any): any;
    /** ```ts
// Append an object to database table. This is the same as "add" except that it will not update table schema when the object contains fields not defined in the table schema.
var obj = {fieldone: "value one", fieldtwo: "value two"};
var returnid = k.DB.indexedDb.tablename.append(obj);
```
 */
    append(value: any): any;
    /** ```ts
// update an item, key must be the system default Guid key or the key value of primary key field.
var table = k.DB.indexedDb.tablename;
var obj = {fieldone: "value one"};
var id = table.add(obj);   
obj.fieldone = "new value";   
table.update(id, obj);
```
 */
    update(id: any, newvalue: any): void;
    /** ```ts
// update an item
var table = k.DB.indexedDb.tablename;
var obj = {fieldone: "value one"};
var id = table.add(obj);   
var item = table.get(id);
item.fieldone = "new value";   
table.update(item);
```
 */
    update(newvalue: any): void;
    /** ```ts
// Delete an item from database based on id or primary key
 k.DB.indexedDb.tablename.delete(key);
```
 */
    delete(id: any): void;
    /** ```ts
// Return the first itme that match query condition
// available operators: ==,  >=,  >,  <,  <=, contains, startwith 
var table = k.DB.indexedDb.tablename;
var items = table.find("name == 'matchedvalue'"); 
var items = table.find("number>=123"); 
var items = table.find("number >=123&&name=='matchedvalue'"); 
var items = table.find("name contains 'matchedvalue'"); 
var items = table.find("name startwith 'matchedvalue'");
```
 */
    find(query: string): IDynamicTableObject;
    /** ```ts
// Return the first itme that match query condition
// available operators: ==,  >=,  >,  <,  <=, contains, startwith 
var table = k.DB.indexedDb.tablename;
var items = table.find("name == 'matchedvalue'"); 
var items = table.find("number>=123"); 
var items = table.find("number >=123&&name=='matchedvalue'"); 
var items = table.find("name contains 'matchedvalue'"); 
var items = table.find("name startwith 'matchedvalue'");
```
 */
    find<T>(query: string): T;
    /** ```ts
// return the first item that has field value equal the match value
var item = k.DB.indexedDb.tablename.find("fieldname", "matchvalue");
```
 */
    find(fieldName: string, matchValue: any): IDynamicTableObject;
    /** ```ts
// return the first item that has field value equal the match value
var item = k.DB.indexedDb.tablename.find("fieldname", "matchvalue");
```
 */
    find<T>(fieldName: string, matchValue: any): T;
    /** ```ts
// return the first item that has field value equal the match value
const { GT } = k.DB.indexedDb.operators();      
var item = k.DB.indexedDb.tablename.find({age:{[GT]:23}});
```
 */
    find(filter: any): IDynamicTableObject;
    /** ```ts
// return the first item that has field value equal the match value
const { GT } = k.DB.indexedDb.operators();      
var item = k.DB.indexedDb.tablename.find({age:{[GT]:23}});
```
 */
    find<T>(filter: any): T;
    /** ```ts
// return all items that have the field value equal the match value
var items = k.DB.indexedDb.tablename.findAll("fieldname", "matchvalue");
```
 */
    findAll(field: string, value: any): IDynamicTableObject[];
    /** ```ts
// return all items that have the field value equal the match value
var items = k.DB.indexedDb.tablename.findAll("fieldname", "matchvalue");
```
 */
    findAll<T>(field: string, value: any): T;
    /** ```ts
// Search all items based on query condition
// available operators: ==,  >=,  >,  <,  <=, contains, startwith 
var table = k.DB.indexedDb.tablename;
var items = table.findAll("name == 'matchedvalue'"); 
var items = table.findAll("number>=123"); 
var items = table.findAll("number >=123&&name=='matchedvalue'"); 
var items = table.findAll("name contains 'matchedvalue'"); 
var items = table.findAll("name startwith 'matchedvalue'");
```
 */
    findAll(query: string): IDynamicTableObject[];
    /** ```ts
// Search all items based on query condition
// available operators: ==,  >=,  >,  <,  <=, contains, startwith 
var table = k.DB.indexedDb.tablename;
var items = table.findAll("name == 'matchedvalue'"); 
var items = table.findAll("number>=123"); 
var items = table.findAll("number >=123&&name=='matchedvalue'"); 
var items = table.findAll("name contains 'matchedvalue'"); 
var items = table.findAll("name startwith 'matchedvalue'");
```
 */
    findAll<T>(query: string): T;
    /** ```ts
// Search all items based on query condition
const { GT } = k.DB.indexedDb.operators();      
var item = k.DB.indexedDb.tablename.findAll({age:{[GT]:23}});
```
 */
    findAll(filter: any): IDynamicTableObject[];
    /** ```ts
// Search all items based on query condition
const { GT } = k.DB.indexedDb.operators();      
var item = k.DB.indexedDb.tablename.findAll({age:{[GT]:23}});
```
 */
    findAll<T>(filter: any): T;
    /** get an item based on Id or primary key */
    get(id: any): IDynamicTableObject;
    /** get an item based on Id or primary key */
    get<T>(id: any): T;
    query(): ITableQuery;
    /** Return the query object for further operations like paging. use the same query syntax as find or findAll */
    query(query: string): ITableQuery;
    /** Return the query object for further operations like paging. use the same query syntax as find or findAll */
    query(filter: any): ITableQuery;
    /** create additional index */
    createIndex(fieldname: string): void;
    /** Return all items */
    all(): IDynamicTableObject[];
    /** Return all items */
    all<T>(): T;
    /** Return editing history of this object */
    getLogs(id: any): Kooboo.Sites.Scripting.ChangeLog[];
    /** Get object based on the log id */
    getByLog(LogId: number): IDynamicTableObject;
    count(query: string): number;
    pagination(index: number, size: number): Kooboo.Sites.Scripting.Global.Models.PaginationModel;
    pagination(index: number, size: number, where: string): Kooboo.Sites.Scripting.Global.Models.PaginationModel;
    count(filter: any): number;
  }

  interface IDynamicTableObject extends Kooboo.Data.Interface.IDynamic {
  }

  interface KFullTextSearch {
    /** 
var productFts=k.site.search.on('products');
productFts.addDocument('tee1','tee description')
 */
    addDocument(metaKey: string, body: string): void;
    /** 
var productFts=k.site.search.on('products');
productFts.deleteDocument('tee1')
 */
    deleteDocument(metaKey: string): void;
    /** 
var productFts=k.site.search.on('products');
productFts.deleteDocuments()
 */
    deleteDocuments(): void;
    /** 
var productFts=k.site.search.on('products');
productFts.findAll('tee',9999)
 */
    findAll(keyword: string, top: number): SearchResult;
    /** 
var productFts=k.site.search.on('products');
var topDocs=productFts.findAll('tee',9999);
var metaKey=productFts.getMetaKey(topDocs.scoreDocs[0].doc)
 */
    getMetaKey(doc: number): string;
  }

  interface ResumableUploadTask {
    id: string;
    name: string;
    size: number;
    chunkSize: number;
    requireChunks: number[];
    timestamp: number;
    /** Build file from all chunks
```
var taskId = k.request.task; //task id
var name = k.request.name; //new file name,if null will use task name
var task = k.file.resumableUpload.get(taskId);
var fileInfo = task.build(name)
k.response.write(fileInfo)
```    
     */
    build(fileName?: string): FileInfo;
    /** Save resumable upload chunk data
```
var taskId = k.request.task; //task id
var chunk = k.request.chunk; //chunk index
var binary = k.request.files[0].bytes //chunk data
var task = k.file.resumableUpload.get(taskId);
task.saveChunk(binary, chunk)
```    
     */
    saveChunk(bytes: number[], chunk: number): void;
    /** Save resumable upload chunk data
```
var taskId = k.request.task; //task id
var chunk = k.request.chunk; //chunk index
var file = k.request.files[0] //chunk data
var task = k.file.resumableUpload.get(taskId);
task.saveChunk(file, chunk)
```    
     */
    saveChunk(file: UploadFile, chunk: number): void;
  }

  interface CommandObject {
    aggregate: any;
    pipeline: any[];
    explain: boolean;
    allowDiskUse: boolean;
    cursor: any;
    maxTimeMS: number;
    bypassDocumentValidation: boolean;
    readConcern: any;
    collation: any;
    hint: any;
    comment: string;
    writeConcern: any;
    delete: string;
    deletes: any[];
    ordered: boolean;
    find: string;
    filter: any;
    sort: any;
    projection: any;
    skip: number;
    limit: number;
    batchSize: number;
    singleBatch: boolean;
    max: any;
    min: any;
    returnKey: boolean;
    showRecordId: boolean;
    tailable: boolean;
    oplogReplay: boolean;
    noCursorTimeout: boolean;
    awaitData: boolean;
    allowPartialResults: boolean;
    insert: string;
    documents: any[];
    update: string;
    updates: any[];
  }

  interface CommandResult {
    cursor: Cursor;
    ok: number;
  }

  interface RedisDatabase {
    /** If key already exists and is a string, this command appends the value at the end of the string. If key does not exist it is created and set as an empty string, so APPEND will be similar to SET in this special case.

https://redis.io/commands/append

Returns:
The length of the string after the append operation. */
    stringAppend(key: string, value: string): number;
    /** Decrements the number stored at key by decrement. If the key does not exist, it is set to 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that is not representable as integer. This operation is limited to 64 bit signed integers.

See https://redis.io/commands/decrby, https://redis.io/commands/decr.

Returns:
The value of key after the decrement. */
    stringDecrement(key: string, value?: number): number;
    /** Deletes key if it matches the given when condition.

See https://redis.io/commands/delex. */
    stringDelete(key: string): boolean;
    /** Get the value of key. If the key does not exist the special value RedisValue.Null is returned. An error is returned if the value stored at key is not a string, because GET only handles string values.

https://redis.io/commands/get

Returns:
The value of key, or RedisValue.Null when key does not exist. */
    stringGet(key: string): string;
    /** Get the value of key and delete the key. If the key does not exist the special value RedisValue.Null is returned. An error is returned if the value stored at key is not a string, because GET only handles string values.

https://redis.io/commands/getdelete

Returns:
The value of key, or RedisValue.Null when key does not exist. */
    stringGetDelete(key: string): string;
    /** Get the value of key. If the key does not exist the special value default is returned. An error is returned if the value stored at key is not a string, because GET only handles string values.

https://redis.io/commands/get

Returns:
The value of key and its expiry, or default when key does not exist. */
    stringGetWithExpiry(key: string): Kooboo.Sites.Scripting.Global.Redis.ValueWithExpiry;
    /** Gets the value of key and update its (relative) expiry. If the key does not exist, the result will be RedisValue.Null.

https://redis.io/commands/getex

Returns:
The value of key, or RedisValue.Null when key does not exist. */
    stringGetSetExpiry(key: string, expirySeconds: number): string;
    /** Returns the substring of the string value stored at key, determined by the offsets start and end (both are inclusive). Negative offsets can be used in order to provide an offset starting from the end of the string. So -1 means the last character, -2 the penultimate and so forth.

https://redis.io/commands/getrange

Returns:
The substring of the string value stored at key. */
    stringGetRange(key: string, start: number, end: number): string;
    /** Atomically sets key to value and returns the old value stored at key.

https://redis.io/commands/getset

Returns:
The old value stored at key, or RedisValue.Null when key did not exist. */
    stringGetSet(key: string, value: string): string;
    /** Increments the string representing a floating point number stored at key by the specified increment. If the key does not exist, it is set to 0 before performing the operation. The precision of the output is fixed at 17 digits after the decimal point regardless of the actual internal precision of the computation.

https://redis.io/commands/incrbyfloat

Returns:
The value of key after the increment. */
    stringIncrement(key: string, value?: number): number;
    /** Set key to hold the string value, if it matches the given when condition.

See https://redis.io/commands/set. */
    stringSet(key: string, value: string, expirySeconds?: number): boolean;
    /** Overwrites part of the string stored at key, starting at the specified offset, for the entire length of value. If the offset is larger than the current length of the string at key, the string is padded with zero-bytes to make offset fit. Non-existing keys are considered as empty strings, so this command will make sure it holds a string large enough to be able to set value at offset.

https://redis.io/commands/setrange

Returns:
The length of the string after it was modified by the command. */
    stringSetRange(key: string, offset: number, value: string): string;
    /** Returns the length of the string value stored at key.

https://redis.io/commands/strlen

Returns:
The length of the string at key, or 0 when key does not exist. */
    stringLength(key: string): number;
  }

  interface Excel {
    getWorkBook(fileName: string): Kooboo.Sites.Scripting.Global.Office.Excel.KWorkBook;
    getWorkBookFromBytes(buffer: number[], extensionName: string): Kooboo.Sites.Scripting.Global.Office.Excel.KWorkBook;
    createNewWorkbook(extensionName?: string): Kooboo.Sites.Scripting.Global.Office.Excel.KWorkBook;
    /** Read all sheet names */
    readSheetNames(fileName: string): string[];
    /** Read all sheet names */
    readSheetNamesFromBytes(buffer: number[], extensionName: string): string[];
    /** ```ts
// Read excel data. First row data as column names.
// fileName:the file name
// sheetName: if sheetName is empty then read the first sheet
// range:Specify the range of the rows and columns to read.
// example：
k.office.excel.ReadAsObjects("test.xlsx");
// example2:
k.office.excel.readAsObjects(file,'sheet1',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastColumnIndex : 3});
```
 */
    readAsObjects(fileName: string, sheetName?: string, range?: Kooboo.Sites.Scripting.Global.Office.Excel.KExcelReadRange): Record<string, any>[];
    /** ```ts
// Read excel data. First row data as column names.
// buffer:the file buffer
// extensionName: .xlsx or .xls
// sheetName: if sheetName is empty then read the first sheet
// range:Specify the range of the rows and columns to read.
// example：
k.office.excel.ReadAsObjectsFromBytes(buffer,".xlsx")
// example2:
k.office.excel.readAsObjectsFromBytes(buffer,'.xlsx','Sheet1',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastColumnIndex : 3});
```
 */
    readAsObjectsFromBytes(buffer: number[], extensionName: string, sheetName?: string, range?: Kooboo.Sites.Scripting.Global.Office.Excel.KExcelReadRange): Record<string, any>[];
    /** ```ts
// Read excel data. Every row readed as an array.
// fileName:the excel file name
// sheetName: if sheetName is empty then read the first sheet
// range:Specify the range of the rows and columns to read.
// example：
k.office.excel.ReadAsArrays("test.xlsx")
// example2:
k.office.excel.readAsArrays(file,'sheet1',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastColumnIndex : 3});
```
 */
    readAsArrays(fileName: string, sheetName?: string, range?: Kooboo.Sites.Scripting.Global.Office.Excel.KExcelReadRange): any[];
    /** ```ts
// Read excel data. First row data as column names。
// buffer:the file buffer
// extensionName: .xlsx or .xls
// sheetName: if sheetName is empty then read the first sheet
// range:Specify the range of the rows and columns to read.
// example：
k.office.excel.ReadAsArraysFromBytes(buffer,".xlsx")
// example2:
k.office.excel.readAsArraysFromBytes(buffer,'.xlsx','Sheet1',{firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastColumnIndex : 3});
```
 */
    readAsArraysFromBytes(buffer: number[], extensionName: string, sheetName?: string, range?: Kooboo.Sites.Scripting.Global.Office.Excel.KExcelReadRange): any[];
  }

  interface ITableQuery {
    count(): number;
    orderBy(fieldname: string): ITableQuery;
    orderByDescending(fieldname: string): ITableQuery;
    skip(skip: number): ITableQuery;
    take(count: number): IDynamicTableObject[];
    take<T>(count: number): T;
    where(searchCondition: string): ITableQuery;
    where(filter: any): ITableQuery;
    all(): IDynamicTableObject[];
    all<T>(): T;
  }

  interface SearchResult {
    totalHits: number;
    scoreDocs: ScoreDoc[];
  }

  interface Cursor {
    firstBatch: any[];
    id: number;
    ns: string;
  }

  interface ScoreDoc {
    doc: number;
    scope: number;
  }

}
declare namespace KScript.AI {
  interface KAI {
    app: KAIApp;
    vectorization: KAIVectorization;
    callFunction(name: string, arguments: any): any;
  }

  interface KAIApp {
    menus: menuItem[];
    getWireFrame(): Kooboo.Sites.AIBuilder.Application.Model.WireFrame;
    getContext(): Kooboo.Sites.AIBuilder.Application.Model.DomainContext;
    listScenarios(): Kooboo.Sites.AIBuilder.Application.Model.Scenario[];
    listFacts(): Kooboo.Sites.AIBuilder.Application.Model.Fact[];
    listEntities(): Kooboo.Sites.AIBuilder.Application.Model.Fact[];
  }

  interface KAIVectorization {
    searchProduct(keyword: string, options?: Kooboo.Sites.AI.Vectorization.VectorSearchOptions): Kooboo.Sites.AI.Vectorization.VectorSearchResult[];
    searchPage(keyword: string, options?: Kooboo.Sites.AI.Vectorization.VectorSearchOptions): Kooboo.Sites.AI.Vectorization.VectorSearchResult[];
    searchView(keyword: string, options?: Kooboo.Sites.AI.Vectorization.VectorSearchOptions): Kooboo.Sites.AI.Vectorization.VectorSearchResult[];
    searchLabel(keyword: string, options?: Kooboo.Sites.AI.Vectorization.VectorSearchOptions): Kooboo.Sites.AI.Vectorization.VectorSearchResult[];
    searchLayout(keyword: string, options?: Kooboo.Sites.AI.Vectorization.VectorSearchOptions): Kooboo.Sites.AI.Vectorization.VectorSearchResult[];
    searchHtmlBlock(keyword: string, options?: Kooboo.Sites.AI.Vectorization.VectorSearchOptions): Kooboo.Sites.AI.Vectorization.VectorSearchResult[];
    searchTextContent(keyword: string, options?: ContentVectorSearchOptions): ContentVectorSearchResult[];
  }

  interface menuItem {
    route: string;
    anchorText: string;
    icon: string;
  }

  interface ContentVectorSearchOptions extends Kooboo.Sites.AI.Vectorization.VectorSearchOptions {
    folder: string;
    top: number;
  }

  interface ContentVectorSearchResult extends Kooboo.Sites.AI.Vectorization.VectorSearchResult {
    folder: string;
    scope: number;
    id: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.NET {
  interface KNET {
    IP: KIP;
    url: KScript.Curl;
    httpClient: KScript.Net.Http.KHttpClient;
    webSocket: Kooboo.Sites.Scripting.Global.KWebSocket;
    DNS: KDNS;
    sshClient: KScript.Ssh.SshClient;
    sftpClient: KScript.Sftp.SftpClient;
    telnetClient: KScript.Telnet.TelnetClient;
    /** ```ts
const result= k.utils.ping('baidu.com')
```
 */
    ping(command: string): PingResult;
  }

  interface PingResult {
    ip: string;
    time: number;
    success: boolean;
  }

  interface KIP {
    context: Kooboo.Data.Context.RenderContext;
    myIP: string;
    getCity(IpAddress: string): Kooboo.Data.GeoLocation.IPInfo;
    getCountry(IpAddress: string): Kooboo.Data.GeoLocation.IPInfo;
    getCityOrCountry(IpAddress: string): Kooboo.Data.GeoLocation.IPInfo;
  }

  interface KDNS {
    getIPs(host: string): KIPAddress[];
    getIPs(NSServer: string, host: string): KIPAddress[];
    getReverseDNS(IP: string): string;
    getMXs(nsServer: string, host: string): string[];
    getMXs(host: string): string[];
    getNsServers(host: string): string[];
    whoisInfo(host: string): string;
  }

  interface KIPAddress {
    address: string;
    isIP4: boolean;
    isIP6: boolean;
    toIP4(): string;
    toIP6(): string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.InlineEditor {
  interface KInline {
    /** Convert the object to a traceable object for inline editor */
    setTrace(obj: any, TraceModel: Kooboo.Sites.DataTraceAndModify.Marker.ItemTraceModel): any;
    /** create a model to use as tracing */
    createTraceModel(): Kooboo.Sites.DataTraceAndModify.Marker.ItemTraceModel;
    /** Get the trace information of current object */
    getTrace(obj: any): Kooboo.Sites.DataTraceAndModify.Marker.ItemTraceModel;
    /** Get the trace information of current object */
    getTrace(obj: any): Kooboo.Sites.DataTraceAndModify.Marker.ItemTraceModel;
  }

}
declare namespace Kooboo.Sites.ScriptModules {
  interface KModule {
    task: Kooboo.Sites.Scripting.Global.EventTask.KTask;
    baseUrl: string;
    config: any;
    name: string;
    localIndexedDb: KScript.IDatabase;
    localSqlite: Kooboo.Sites.Scripting.Global.Sqlite.SqliteDatabase;
    localFile: LocalFile;
    list(): Kooboo.Sites.Models.ScriptModule[];
    createModule(name: string): Kooboo.Sites.Models.ScriptModule;
    remove(Id: any): void;
    isNameExists(name: string): boolean;
    remove(IdOrName: string): void;
    remove(IdOrName: string, DestinationSiteUrl: string): void;
    importZip(name: string, Binary: number[]): string;
    exportAsZip(NameOrId: string): number[];
    importFromUrl(SiteUrl: string, ModuleId: string, newModuleName: string): string;
    importFromUrl(SiteUrl: string, ModuleId: string, newModuleName: string, DestinationSiteUrl: string): string;
    importFromUrl(SiteUrl: string, ModuleId: any, newModuleName: string): string;
    searchRepository(keyword: string): Kooboo.Sites.ViewModel.ModuleSearchResult[];
    installFromRepository(PackageId: string, Name: string): string;
    /** open file handler by type, filetype is one of css,js, view, api, img, file. */
    openFileStream(fileType: string): Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
  }

  interface LocalFile {
    css: Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
    js: Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
    api: Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
    img: Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
    file: Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
    view: Kooboo.Sites.ScriptModules.KModuleApi.KModuleFiles;
  }

  interface ModuleFileInfo {
    name: string;
    fullName: string;
    folderName: string;
    extension: string;
    size: number;
    stringSize: string;
    lastModified: Date;
  }

  interface ModuleContext {
    dbPath: string;
    module: Kooboo.Sites.Models.ScriptModule;
    renderContext: Kooboo.Data.Context.RenderContext;
    executingView: string;
    rootFolder: string;
    culture: string;
    request: Kooboo.Sites.ScriptModules.Render.ModuleRequest;
    startView: string;
    getBaseUrl(): string;
    fromRenderContext(context: Kooboo.Data.Context.RenderContext, module: Kooboo.Sites.Models.ScriptModule): ModuleContext;
    createNewFromRenderContext(context: Kooboo.Data.Context.RenderContext, module: Kooboo.Sites.Models.ScriptModule): ModuleContext;
    makeModuleUrl(moduleRelativeUrl: string): string;
  }

  interface DiskHandler {
    readBinary(Folder: string, FileName: string): number[];
    read(Folder: string, FileName: string): string;
    write(folder: string, fileName: string, content: string): void;
    writeBinary(folder: string, fileName: string, binary: number[]): void;
    readVersion(folder: string, FileName: string): string;
    exists(folder: string, FileName: string): boolean;
    delete(folder: string, FileName: string): void;
    getAllFiles(): ModuleFileInfo[];
    folderFiles(folder: string): ModuleFileInfo[];
    getFileInfo(folder: string, fileName: string): ModuleFileInfo;
    getFileInfo(fullfilename: string): ModuleFileInfo;
    subFolders(folder?: string): ModuleFolderInfo[];
    createFolder(Folder: string, ParentFolder: string): void;
    createFolder(Folder: string): void;
    deleteFolder(Folder: string): void;
    fromModuleContext(context: ModuleContext, resType: Kooboo.Sites.ScriptModules.Models.ResourceType): DiskHandler;
    fromModuleContext(context: ModuleContext, resFolder: string): DiskHandler;
    fromMailModuleContext(context: Kooboo.Mail.Extension.MailModuleContext, resFolder: string): DiskHandler;
  }

  interface ModuleFolderInfo {
    name: string;
    fullName: string;
    lastModified: Date;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Koobox {
  interface KKoobox {
    favorite: KFavorite;
    site: KSite;
    service: KService;
    dataCenter: KDataCenter;
    template: KTemplate;
    isOnlineServer: boolean;
    cmsLang: string;
    execute(): void;
  }

  interface KFavorite {
    recommends(): RecommendFavoriteModel[];
    list(): FavoriteModel[];
    add(favorite: FavoriteModel): void;
    updatePayload(id: string, payload: string): void;
    remove(id: string): void;
    editList(ids: string[]): void;
    add(renderContext: Kooboo.Data.Context.RenderContext, siteId: any): void;
  }

  interface KSite {
    list(): SiteModel[];
    domains(): Kooboo.Data.Models.Domain[];
    sharedList(): Kooboo.Sites.Store.TemplateItemViewModel[];
    templateModel(Id: string): Kooboo.Sites.Store.Model.TemplateModel;
    delete(id: string): void;
    clone(url: string, siteName: string, fullDomain: string, convertToRoot: boolean): string;
    importFromUrl(url: string, siteName: string, fullDomain: string): string;
    importFromBinary(binary: number[], siteName: string, fullDomain: string): string;
  }

  interface KService {
    list(): ServiceModel[];
  }

  interface KDataCenter {
    list(): Kooboo.Data.ViewModel.DataCenterViewModel[];
    enable(name: string): boolean;
    disable(name: string): boolean;
    makeDefault(name: string): boolean;
    currentDC(): string;
  }

  interface KTemplate {
    getByCache(ids: string[]): Kooboo.Sites.Store.Model.TemplateEditViewModel[];
  }

  interface RecommendFavoriteModel {
    type: string;
    referenceId: string;
    cover: string;
    creationDate: Date;
  }

  interface FavoriteModel {
    id: string;
    type: string;
    referenceId: string;
    cover: string;
    payload: string;
  }

  interface SiteModel {
    id: string;
    name: string;
    url: string;
  }

  interface ServiceModel {
    id: string;
    cover: string;
    name: string;
    url: string;
    price: number;
  }

}
declare namespace Kooboo.Sites.Scripting.Global {
  interface KAccount {
    user: KUser;
    membership: KScript.Account.KMembership;
    subscription: KScript.Account.KSubscription;
    oAuth: Kooboo.Sites.OAuth2.kOAuth;
    organization: KOrganization;
    creditCard: KScript.Payment.Model.UserCreditCard;
    ideal: KScript.Payment.Model.Ideal;
    server: KScript.Account.KServer;
    weChatPay: KScript.Payment.Model.WeChatPay;
    isLogin: boolean;
    /** Generate user login token
```
var token= k.account.generateToken("username",60*60*24); //expire in 1 day
``` */
    generateToken(userName: string, expireIn: number): string;
    getAccessToken(): string;
    ensureLogin(redirectUrl: string): void;
    login(username: string, password: string, code?: string): Kooboo.Data.Models.User;
    loginOrganization(username: string, password: string): Kooboo.Data.Models.User;
    thirdPartyLogin(thirdPartyName: string, userName: string): Kooboo.Data.Models.ThirdPartyLoginInfo;
    logout(returnUrl?: string): void;
    setIdentity(token: string): void;
    renewInfo(): Kooboo.Data.ViewModel.RenewInfo;
  }

  interface KTemplate {
    types: KScript.KeyValue[];
    colors(): string[];
    get(temlateId: string): Kooboo.Sites.Store.TemplateItemViewModel;
    getByIds(ids: string[]): Kooboo.Sites.Store.TemplateItemViewModel[];
    list(query: ListParams): Kooboo.Sites.Scripting.ScriptModel.TemplatePagedData;
    search(query: FullTextSearchParams): TemplateSearchPagedData;
    delete(id: string): void;
    download(templateId: string): number[];
    createSite(templateId: string, SiteName: string, RootDomain: string, SubDomain: string): KScript.kSiteDb;
    createSite(templateId: string, SiteName: string, FullDomain: string): KScript.kSiteDb;
    upload(value: TemplateModel): void;
    share(model: ShareSiteModel): void;
    updateMeta(model: any): boolean;
    updateBinary(TemplateId: string, WebSiteId: string): boolean;
    getEdit(id: string): Kooboo.Sites.Store.Model.TemplateEditViewModel;
    getEditByIds(ids: string[]): Kooboo.Sites.Store.Model.TemplateEditViewModel[];
  }

  interface KPage {
    setTitle(value: string): void;
    setCharsetMeta(value: string): void;
    setHttpEquivMeta(equiv: string, content: string): void;
    setPropertyMeta(property: string, content: string): void;
    setNameMeta(name: string, content: string): void;
  }

  interface KUtils {
    xml: Xml;
    uri: KScript.Utils.KUri;
    /** Sent object to browser JavaScript */
    clientJS: ClientJs;
    /** Share items with public */
    community: Kooboo.Sites.Scripting.Global.Community.KCommunity;
    compression: Compression;
    converter: Kooboo.Sites.Scripting.Extension.Converter;
    date: KDate;
    mime: Kooboo.Sites.Scripting.Global.WebUtility.KMime;
    /** Document objecgt model */
    dom: DocumentObjectModel;
    /** Send SMS notification */
    sms: Kooboo.Sites.Scripting.Global.SMS.SMS;
    /** Office Operations.
            eg:excel */
    office: KScript.Office;
    sitemap: Kooboo.Data.Sitemap.KSitemap;
    screenShot: Kooboo.Sites.Scripting.Global.WebUtility.ScreenShot;
    inlineHtml: Kooboo.Sites.Scripting.Global.WebUtility.KInlineHTML;
    image: Kooboo.Sites.Scripting.Global.WebUtility.KImageUtility;
    google: Kooboo.Sites.Scripting.Global.WebUtility.Google;
    template: Kooboo.Sites.Scripting.Global.WebUtility.KTemplateEngine;
    ninjible: Kooboo.Sites.Scripting.Global.WebUtility.Ninjible;
    CRM: KScript.Utils.KCRM;
    CDN: Kooboo.Sites.Scripting.Global.WebUtility.CDNUtility;
    IP: Kooboo.Sites.Scripting.Global.NET.KIP;
    sshClient: KScript.Ssh.SshClient;
    sftpClient: KScript.Sftp.SftpClient;
    telnetClient: KScript.Telnet.TelnetClient;
    puppeteer: Kooboo.Sites.Scripting.Global.WebUtility.KPuppeteer;
    string: KText;
    /** ```ts
k.sleep(1000);  // 1s
```
 */
    sleep(millisecondsTimeout: number): void;
    bytesToString(bytes: number[], encoding: string): string;
    stringToBytes(content: string, encoding: string): number[];
    /** ```ts
const result= k.utils.ping('baidu.com')
```
 */
    ping(command: string): PingResult;
  }

  interface KPrivacy {
    cookieConsent: Kooboo.Sites.Scripting.Global.Privacy.KCookieConsent;
  }

  interface KWebSocket {
    /** ```ts
// Convert the current request to websocket
// This method will blocking request until websocket closed
const ids= k.net.webSocket.accept('user_1',ctx=>{
    // ctx.text
    // ctx.binary
});
```
 */
    accept(id: string, receive: (p1:Kooboo.Data.WebSocket.WebSocketContext,)=>void): void;
    /** ```ts
// Get all connection id
const ids = k.net.webSocket.list();
// ids: ['user_1','user_2']
```
 */
    list(): string[];
    /** ```ts
// Get connection by id
const connection= k.net.webSocket.get('user_1');
```
 */
    get(id: string): Kooboo.Data.WebSocket.WebSocketConnection;
  }

  interface KUser {
    current: Kooboo.Sites.Scripting.Global.Models.UserModel;
    /** Obsolete please use k.account.isLogin */
    isLogin: boolean;
    /** Obsolete please use k.current.userName */
    userName: string;
    /** Obsolete please use k.account.user.current.firstName */
    firstName: string;
    /** Obsolete please use k.account.user.current.lastName */
    lastName: string;
    /** Obsolete please use k.account.user.current.language */
    language: string;
    /** Obsolete please use k.account.user.current.email */
    email: string;
    /** Obsolete please use k.account.user.current.id */
    id: any;
    isOfOrganization(OrganizationName: string): boolean;
    changeOrganization(OrganizationName: string): Kooboo.Data.Models.User;
    get(userName: string): Kooboo.Data.Models.User;
    exists(UserName: string): boolean;
    emailExists(email: string): boolean;
    existEmail(email: string): boolean;
    /** Obsolete please use k.account.ensureLogin */
    ensureLogin(redirectUrl: string): void;
    /** Obsolete please use k.account.logout */
    logout(): void;
    /** Obsolete please use k.account.login */
    login(username: string, password: string): Kooboo.Data.Models.User;
  }

  interface KOrganization {
    current: Kooboo.Sites.Scripting.Global.Models.OrganizationModel;
    get(nameOrId: string): Kooboo.Sites.Scripting.Global.Models.OrganizationModel;
  }

  interface ListParams {
    pageNr: string;
    pageSize: string;
    typeName: string;
    state: string;
  }

  interface FullTextSearchParams {
    pageNr: string;
    pageSize: string;
    typeName: string;
    keyword: string;
    category: string;
    color: string;
  }

  interface TemplateSearchPagedData extends Kooboo.Sites.Scripting.ScriptModel.TemplatePagedData {
    facets: KScript.Commerce.Models.FacetResult[];
    list: Kooboo.Sites.Store.TemplateItemViewModel[];
    totalCount: number;
    pageNr: number;
    pageSize: number;
    totalPages: number;
  }

  interface TemplateModel {
    name: string;
    color: string;
    category: string;
    cover: number[];
    screenShot: number[];
    package: number[];
  }

  interface ShareSiteModel {
    siteId: string;
    isUpdate: boolean;
    typeName: string;
    coverImage: string;
    screenShot: string;
    siteName: string;
    zhCoverImage: string;
    zhScreenShot: string;
    zhSiteName: string;
    currency: string;
    price: number;
  }

  interface FileVersion {
    imageVersionSrc(imgSrc: string): string;
    jsVersionSrc(src: string): string;
    cssVersionSrc(src: string): string;
  }

  interface InfoModel {
    culture: string;
    /** WebSite name */
    name: string;
    setting: KScript.KDictionary;
    user: KScript.Sites.UserModel;
    baseUrl: string;
    version: number;
    domains: string[];
    host: string;
    page: Kooboo.Sites.Models.Page;
    updateSetting(key: string, value: string): void;
    removeSetting(key: string): void;
    makeAbsUrl(relativePath: string): string;
    enableSsl(fulldomain: string): void;
    setDomain(fulldomain: string): void;
  }

  interface PingResult {
    ip: string;
    time: number;
    success: boolean;
  }

  interface Xml {
    /** Prase a XML document string into a XML document */
    parse(xml: string): Document;
    /** ```ts
// Create a new XML document
var xmldoc = k.xml.create("rootname");   
var child = xmldoc.root.addChild("childname"); 
child.addAttribute("attname", "attValue"); 
child.value = "Text Value";  
var xmlstring = xmldoc.stringify();
```
 */
    create(rootName: string): Document;
  }

  interface ClientJs {
    /** ```ts
// Send an Object as a client JS object to Browser
const obj = {};
obj.firstname = "name"; 
obj.lastname = "lastname"; 
k.clientJS.setVariable("myname", obj);
```
 */
    setVariable(key: string, obj: any): void;
    monacoResource(callback: string): string;
    i18n(all?: boolean): any;
  }

  interface Compression {
    decompressGzip(path: string): string;
    decompressGzipBinary(bytes: number[]): string;
    /** zip a binary stream */
    zip(items: Entry[]): number[];
    /** zip a folder */
    zip(folder: string, zipPath: string): void;
    /** unzip a binary stream */
    unzip(Binary: number[]): Kooboo.Sites.Scripting.Global.Models.ZipItem[];
    /** unzip a FileIO File to a FileIO Folder */
    unzip(zipPath: string, folder: string): void;
  }

  interface KDate {
    utcNow: Date;
    now: Date;
    formate(dateTime: Date, formate: string): string;
    formate(dateTime: Date): string;
    addSeconds(dateTime: Date, seconds: number): Date;
    addMinutes(dateTime: Date, minutes: number): Date;
    addHours(dateTime: Date, hours: number): Date;
    addDays(dateTime: Date, days: number): Date;
    addMonths(dateTime: Date, months: number): Date;
    addYears(dateTime: Date, years: number): Date;
  }

  interface DocumentObjectModel {
    document: Kooboo.Dom.Document;
    hasImage: boolean;
    images: DomImage[];
    parse(html: string): DocumentObjectModel;
    getText(html: string): string;
  }

  interface KText {
    removeHtml(input: string): string;
    sementicSubString(input: string, start: number, count: number): string;
    subString(input: string, start: number, count: number): string;
    replace(input: string, oldValue: string, newValue: string): string;
    remove(input: string, ValueToRemove: string): string;
  }

  interface Document {
    declaration: Declaration;
    root: Element;
    /** Convert a XML document into string representation */
    stringify(): string;
  }

  interface Entry {
    name: string;
    binary: number[];
  }

  interface DomImage {
    src: string;
    alt: string;
  }

  interface Declaration {
    version: string;
    encoding: string;
    standalone: string;
  }

  interface Element {
    children: Element[];
    attributes: Attribute[];
    name: string;
    value: string;
    /** // Add normal attribute
const doc = k.utils.xml.create("root");
doc.root.addAttribute("key", "value")

//Add namespace definition
const doc = k.utils.xml.create("root");
doc.root.addAttribute("{http://www.w3.org/2000/xmlns/}xlink", "http://www.kooboo.com/xlink")

//Add attribute with namespace
doc.root.addAttribute("{http://www.kooboo.com/xlink}href", "http://www.kooboo.cn") */
    addAttribute(name: string, value: string): Attribute;
    addChild(name: string): Element;
    addCData(content: string): void;
    removeAttribute(name: string): void;
    removeChild(name: string): void;
  }

  interface Attribute {
    name: string;
    value: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Logging {
  interface KLogger {
    /** ```ts
k.logger.debug('Order xxx created')
```
 */
    debug(message: string): void;
    /** ```ts
k.logger.debug('Store.Order','Order xxx created')
```
 */
    debug(category: string, message: string): void;
    /** ```ts
k.logger.information('Order xxx created')
```
 */
    information(message: string): void;
    /** ```ts
k.logger.information('Store.Order','Order xxx created')
```
 */
    information(category: string, message: string): void;
    /** ```ts
k.logger.warning('Order xxx not set create date!')
```
 */
    warning(message: string): void;
    /** ```ts
k.logger.warning('Store.Order','Order xxx not set create date!')
```
 */
    warning(category: string, message: string): void;
    /** ```ts
k.logger.error('Order xxx not found!')
```
 */
    error(message: string): void;
    /** ```ts
k.logger.error('Store.Order','Order xxx not found!')
```
 */
    error(category: string, message: string): void;
    /** ```ts
k.logger.critical('Application crash!')
```
 */
    critical(message: string): void;
    /** ```ts
k.logger.critical('Application','Application crash!')
```
 */
    critical(category: string, message: string): void;
    /** ```ts
var logs = k.logger.query({
    startDate: '2021-10-27 12:00',
    endDate: '2021-10-27 17:25',
    category: 'user',
    level: 'Error',
    pageIndex: 1,
    pageSize: 100,
    keyword: 'exception',
    traceId: '0HMCP7T6K7BFS:00000002'
})

k.response.json(logs)
```
 */
    query(arg: CodeLogQuery): any;
  }

  interface CodeLogQuery {
    startDate?: Date;
    endDate?: Date;
    category: string;
    level: string;
    keyword: string;
    traceId: string;
    pageIndex: number;
    pageSize: number;
  }

  interface CodeLogStore {
    weekNameFolder: string;
    isActiveWeek: boolean;
    groupByFunctions: Record<string, (p1:System.Int32,p2:System.String,)=>Kooboo.Data.Logging.CodeLog>;
    add(Value: Kooboo.Data.Logging.CodeLog): void;
    getDB(DayOfWeek: number): any;
    add(data: Kooboo.Data.Logging.CodeLog, time?: Date): void;
    close(): void;
    daysTotal(): Record<number, number>;
    daysTotal(summary: Kooboo.Data.Storage.DayLogSummary): Record<number, number>;
    readSummary(): Kooboo.Data.Storage.DayLogSummary;
    take(count: number): Kooboo.Data.Logging.CodeLog[];
    list(PageNumber: number, PageSize: number): any;
    closeRead(): void;
  }

}
declare namespace Kooboo.Sites.Scripting {
  interface KCache extends Kooboo.Data.Cache.MemoryCacheBase {
    group: string;
    /** ```ts
// Set an item to memory cache
k.cache.set("key", "value", 3600);
```
 */
    set(key: string, value: any, seconds: number): void;
    /** ```ts
// Set an item to memory cache expries in 120 minutes
k.cache.set("key", "value");
```
 */
    set(key: string, value: any): void;
    /** ```ts
// Get an item from memory cache,if not exists return undefined
const value = k.cache.get("key");
```
 */
    get(key: string): any;
    /** ```ts
// Get or create an item from memory cache,if not exists return undefined
const value = k.cache.getOrCreate("key", () => {
    return "cached-value"
}, 3600);
```
 */
    getOrCreate(key: string, factory: Function, seconds: number): any;
    /** ```ts
// Remove an item from memory cache
k.cache.remove("key");
```
 */
    remove(key: string): void;
    /** ```ts
// Remove all items from memory cache
k.cache.removeAll();
```
 */
    removeAll(): void;
    /** ```ts
// Check if the cache key has value
const exists = k.cache.containsKey("key");
```
 */
    containsKey(key: string): boolean;
    /** ```ts
// Cache external resource into local server
```
 */
    localCache(externalUrl: string, hours: number): string;
    getOrSet(key: string, scriptOrFunctionName: string, TimeOutMinutes: number): any;
    set(key: string, value: any, options: Kooboo.Data.Cache.Options): void;
    get(key: string): any;
    getOrCreate(key: string, factory: any, options?: Kooboo.Data.Cache.Options): any;
    remove(key: string): void;
  }

  interface KMenus {
    /** ```ts
const menu = k.site.menus.get('my_menu');
```
 */
    get(nameOrId: string): Menu;
    /** ```ts
const menu = k.site.menus.create('my_menu');
```
 */
    create(name: string): Menu;
    /** ```ts
var menus= k.site.menus.list();
```
 */
    list(): Menu[];
    /** ```ts
const menu = k.site.menus.get('my_menu');
k.site.menus.updateSubMenu(menu.id,menu.children[0].id,'newName','/newUrl');
```
 */
    remove(id: string): void;
  }

  interface Multilingual {
    currentCulture: string;
    cultures: Record<string, string>;
    currentURLs(): SiteMultilingualInfo[];
    getURLs(relativeUrl: string): SiteMultilingualInfo[];
    getLangUrl(relativeUrl: string, culture: string): string;
    getUrl(relativeUrl: string): string;
  }

  interface ChangeLog {
    storeName: string;
    tableName: string;
    userName: string;
    userId: any;
    editTime: Date;
    editType: Kooboo.IndexedDB.EditType;
    logId: number;
  }

  interface Menu extends Kooboo.Sites.DataTraceAndModify.ITraceability {
    name: string;
    url: string;
    id: string;
    children: Menu[];
    source: string;
    getName(culture: string): string;
    /** ```ts
const menu = k.site.menus.get('my_menu');
menu.createSubMenu('newName','/newUrl');
```
 */
    createSubMenu(name: string, url: string): void;
    /** ```ts
const menu = k.site.menus.get('my_menu');
menu.updateSubMenu(menu.children[0].id,'newName','/newUrl');
```
 */
    updateSubMenu(subMenuId: string, name: string, url: string, culture?: string): void;
    /** ```ts
const menu = k.site.menus.get('my_menu');
menu.removeSubMenu(menu.children[0].id);
```
 */
    removeSubMenu(subMenuId: string): void;
    getTraceInfo(): any;
  }

  interface SiteMultilingualInfo {
    key: string;
    name: string;
    URL: string;
    isActive: boolean;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Database {
  interface KDB {
    sequenceDb: Kooboo.Sites.Scripting.Global.DB.KWormDb;
    indexedDb: KScript.IDatabase;
    sqlite: Kooboo.Sites.Scripting.Global.Sqlite.SqliteDatabase;
    mysql: Kooboo.Sites.Scripting.Global.Mysql.MysqlDatabase;
    sqlServer: Kooboo.Sites.Scripting.Global.SqlServer.SqlServerDatabase;
    /** ```ts
// Dynamically selected database
// example:
// site setting default datebase => mysql
k.sql == k.mysql
```
 */
    sql: Kooboo.Sites.Scripting.Interfaces.IRelationalDatabase;
    mongo: KScript.MongoDatabase;
    redis: KScript.RedisConnection;
    /** The database key value storage */
    keyValue: KScript.kKeyValue;
    getSiteSqliteConnectionString(webSite: Kooboo.Data.Models.WebSite): string;
    getSqliteDbPath(website: Kooboo.Data.Models.WebSite): string;
  }

  interface KeyValueObject extends Kooboo.Sites.DataTraceAndModify.ITraceability {
    source: string;
    getTraceInfo(): any;
  }

}
declare namespace KScript.Api {
  interface KApi {
    /** ```ts
//GET /test?id=23

k.api.get(function(id){
  return id;
})

//result '23'
```
 */
    get(action: Function): void;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {name: 'id',type: 'Number'}
])

//result 23.0
```
 */
    get(action: Function, metas: RootMeta[]): void;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
},function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    get(action: Function, resultHander: Function): void;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {name: 'id',type: 'Number'}
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    get(action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//POST /test?id=23
// {
//     'age':40
// }

k.api.post(function (id, body) {
    return {
        id: id,
        body: body
    }
})

//result {'id': '23','body': {'age': 40}}
```
 */
    post(action: Function): void;
    /** ```ts
//POST /test?id=23
// {
//     'age':40
// }

k.api.post(function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
])

//result {'id': '23','body': {'age': 40}}
```
 */
    post(action: Function, metas: RootMeta[]): void;
    /** ```ts
//POST /test?id=23
// {
//     'age':40
// }

k.api.post(function (id, body) {
    return {
        id: id,
        body: body
    }
},function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    post(action: Function, resultHander: Function): void;
    /** ```ts
//POST /test?id=23
// {
//     'age':40
// }

k.api.post(function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    post(action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//PUT /test?id=23
// {
//     'age':40
// }

k.api.put(function (id, body) {
    return {
        id: id,
        body: body
    }
})

//result {'id': '23','body': {'age': 40}}
```
 */
    put(action: Function): void;
    /** ```ts
//PUT /test?id=23
// {
//     'age':40
// }

k.api.put(function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
])

//result {'id': '23','body': {'age': 40}}
```
 */
    put(action: Function, metas: RootMeta[]): void;
    /** ```ts
//PUT /test?id=23
// {
//     'age':40
// }

k.api.put(function (id, body) {
    return {
        id: id,
        body: body
    }
},function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    put(action: Function, resultHander: Function): void;
    /** ```ts
//PUT /test?id=23
// {
//     'age':40
// }

k.api.put(function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    put(action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//DELETE /test?id=23
k.api.delete(function (id) {
    return id;
})

//result '23'
```
 */
    delete(action: Function): void;
    /** ```ts
//DELETE /test?id=23
k.api.delete(function (id) {
    return id;
},[
    {name:'id',type:'Number'}
])

//result 23.0
```
 */
    delete(action: Function, metas: RootMeta[]): void;
    /** ```ts
//DELETE /test?id=23
k.api.delete(function (id) {
    return id;
},[
    {name:'id',type:'Number'}
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    delete(action: Function, resultHander: Function): void;
    /** ```ts
//DELETE /test?id=23
k.api.delete(function (id) {
    return id;
},[
    {name:'id',type:'Number'}
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    delete(action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.ok();
})

//result  httcode 200
```
 */
    ok(): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.ok(id);
})

//result '23'
```
 */
    ok(data: any): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.httpCode(400);
})

//result httpcode 400
```
 */
    httpCode(code: number): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.httpCode(400,{error:'id is Required'});
})

//result httpcode:400 body {'error':'id is Required'}
```
 */
    httpCode(code: number, data: any): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.redirect('http://www.kooboo.cn');
})
```
 */
    redirect(url: string): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.badRequest();
})
 d
//result  httcode 400
```
 */
    badRequest(): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.unauthorized();
})
 d
//result  httcode 401
```
 */
    unauthorized(): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.forbidden();
})
 d
//result  httcode 403
```
 */
    forbidden(): KApiResponse;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return k.api.notFound();
})
 d
//result  httcode 404
```
 */
    notFound(): KApiResponse;
    isActionMatch(route: Kooboo.Sites.Routing.Route, actionName: string, requestPath: string, routeValues: any): boolean;
    /** ```ts
//Route /test/{action}

//GET /test/sub?id=23

k.api.get("sub", function(id) {
    return id;
})

//result '23'
```
 */
    get(actionName: string, action: Function): void;
    /** ```ts
//Route /test/{action}

//GET /test/sub?id=23
k.api.get("sub", function (id) {
    return id;
}, [
    {name: 'id',type: 'Number'}
])

//result 23.0
```
 */
    get(actionName: string, action: Function, metas: RootMeta[]): void;
    /** ```ts
//Route /test/{action}

//GET /test/sub?id=23
k.api.get("sub", function (id) {
    return id;
},function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    get(actionName: string, action: Function, resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//GET /test/sub?id=23
k.api.get("sub", function (id) {
    return id;
}, [
    {name: 'id',type: 'Number'}
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    get(actionName: string, action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//POST /test/sub?id=23
// {
//     'age':40
// }

k.api.post("sub", function (id, body) {
    return {
        id: id,
        body: body
    }
})

//result {'id': '23','body': {'age': 40}}
```
 */
    post(actionName: string, action: Function): void;
    /** ```ts
//Route /test/{action}

//POST /test/sub?id=23
// {
//     'age':40
// }

k.api.post("sub", function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
])

//result {'id': '23','body': {'age': 40}}
```
 */
    post(actionName: string, action: Function, metas: RootMeta[]): void;
    /** ```ts
//Route /test/{action}

//POST /test/sub?id=23
// {
//     'age':40
// }

k.api.post("sub", function (id, body) {
    return {
        id: id,
        body: body
    }
},function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    post(actionName: string, action: Function, resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//POST /test/sub?id=23
// {
//     'age':40
// }

k.api.post("sub", function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    post(actionName: string, action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//PUT /test/sub/23
// {
//     'age':40
// }

k.api.put("sub/{id}", function (id, body) {
    return {
        id: id,
        body: body
    }
})

//result {'id': '23','body': {'age': 40}}
```
 */
    put(actionName: string, action: Function): void;
    /** ```ts
//Route /test/{action}

//PUT /test/sub/23
// {
//     'age':40
// }

k.api.put("sub/{id}", function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
])

//result {'id': '23','body': {'age': 40}}
```
 */
    put(actionName: string, action: Function, metas: RootMeta[]): void;
    /** ```ts
//Route /test/{action}

//PUT /test/sub/23
// {
//     'age':40
// }

k.api.put("sub/{id}", function (id, body) {
    return {
        id: id,
        body: body
    }
},function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    put(actionName: string, action: Function, resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//PUT /test/sub/23
// {
//     'age':40
// }

k.api.put("sub/{id}", function (id, body) {
    return {
        id: id,
        body: body
    }
}, [
    { name: 'id', type: 'Number' },
    { name: 'body', from: 'Body', type: 'Object' },
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': {'id': 23,'body': {'age': 40}}, 'error': null, 'code': 200 }
```
 */
    put(actionName: string, action: Function, metas: RootMeta[], resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//DELETE /test/sub/23
k.api.delete("sub/{id}", function (id) {
    return id;
})

//result '23'
```
 */
    delete(actionName: string, action: Function): void;
    /** ```ts
//Route /test/{action}

//DELETE /test/sub/23
k.api.delete("sub/{id}", function (id) {
    return id;
},[
    {name:'id',type:'Number'}
])

//result 23.0
```
 */
    delete(actionName: string, action: Function, metas: RootMeta[]): void;
    /** ```ts
//Route /test/{action}

//DELETE /test/sub/23
k.api.delete("sub/{id}", function (id) {
    return id;
},[
    {name:'id',type:'Number'}
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    delete(actionName: string, action: Function, resultHander: Function): void;
    /** ```ts
//Route /test/{action}

//DELETE /test/sub/23
k.api.delete("sub/{id}", function (id) {
    return id;
},[
    {name:'id',type:'Number'}
],function (code, data) {
    var success = code < 400

    return {
        success: success,
        data: success ? data : null,
        error: success ? null : data,
        code: code
    }
})

//result { 'success': true, 'data': 23, 'error': null, 'code': 200 }
```
 */
    delete(actionName: string, action: Function, metas: RootMeta[], resultHander: Function): void;
  }

  interface RootMeta extends Kooboo.Sites.Scripting.Global.Api.Meta.MetaBase {
    from?: ValueFrom;
    name: string;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        required: true
    }
])
```
 */
    required?: boolean;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number'
    }
])
```
 */
    type?: Types;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number', // if type == 'String' match string length
        min: 30
    }
])
```
 */
    min?: number;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number', // if type == 'String' match string length
        max: 30
    }
])
```
 */
    max?: number;
    /** ```ts
//GET /test?id=bee
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        pattern: 'be+'
    }
])
```
 */
    pattern?: string;
    /** ```ts
//GET /test?id=bee
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        validator: function (value) {
            return value == 'bee'
        }
    }
])
```
 */
    validator?: Function;
    /** ```ts
//POST /test
// {
//     'age':23
// }

k.api.post(function (body) {
    return body;
}, [
    {
        name: 'body',
        from: 'Body',
        children: [
            {
                name: 'age',
                min: 10
            }
        ]
    }
])
```
 */
    children?: ChildMeta[];
  }

  interface KApiResponse {
    code: number;
    data: string;
  }

  type ValueFrom = 'QueryString' | 'Header' | 'Cookie' | 'Form' | 'Body';

  type Types = 'Boolean' | 'String' | 'Number' | 'Object' | 'Array';

  interface ChildMeta extends Kooboo.Sites.Scripting.Global.Api.Meta.MetaBase {
    name: string;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        required: true
    }
])
```
 */
    required?: boolean;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number'
    }
])
```
 */
    type?: Types;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number', // if type == 'String' match string length
        min: 30
    }
])
```
 */
    min?: number;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number', // if type == 'String' match string length
        max: 30
    }
])
```
 */
    max?: number;
    /** ```ts
//GET /test?id=bee
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        pattern: 'be+'
    }
])
```
 */
    pattern?: string;
    /** ```ts
//GET /test?id=bee
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        validator: function (value) {
            return value == 'bee'
        }
    }
])
```
 */
    validator?: Function;
    /** ```ts
//POST /test
// {
//     'age':23
// }

k.api.post(function (body) {
    return body;
}, [
    {
        name: 'body',
        from: 'Body',
        children: [
            {
                name: 'age',
                min: 10
            }
        ]
    }
])
```
 */
    children?: ChildMeta[];
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Google {
  interface KGoogle {
    firebase: KFirebase;
  }

  interface KFirebase {
    /** Parses and verifies a Firebase ID token.

A Firebase client app can identify itself to a trusted backend server by sending its Firebase ID Token (accessible via the getIdToken() API in the Firebase client SDK) with its requests. The backend server can then use this method to verify that the token is valid. This method ensures that the token is correctly signed, has not expired, and it was issued against the Firebase project associated with this FirebaseAuth instance.

See Verify ID Tokens for code samples and detailed documentation. */
    verifyIdToken(idToken: string): any;
    /** Creates a Firebase custom token for the given user ID.  This token can then be sent back to a client application to be used with the signInWithCustomToken authentication API.

This method attempts to generate a token using:

1.  the private key of FirebaseApp's service account credentials, if provided at initialization.
2.  the IAM service if a service accound ID was specified via AppOptions
3.  the local metadata server if the code is deployed in a GCP-managed environment. */
    createCustomToken(uid: string): string;
    /** Creates a new user account with the attributes contained in the specified UserRecordArgs. */
    createUser(user: FirebaseAdmin.Auth.UserRecordArgs): FirebaseAdmin.Auth.UserRecord;
    /** Deletes the user identified by the specified uid. */
    deleteUser(uid: string): void;
    /** Updates an existing user account with the attributes contained in the specified UserRecordArgs. The UserRecordArgs.Uid property must be specified. */
    updateUser(arg: FirebaseAdmin.Auth.UserRecordArgs): FirebaseAdmin.Auth.UserRecord;
    /** Generates the out-of-band email action link for email verification flows for the specified email address. */
    generateEmailVerificationLink(email: string): string;
    /** Generates the out-of-band email action link for password reset flows for the specified email address. */
    generatePasswordResetLink(email: string): string;
    /** Generates the out-of-band email action link for email link sign-in flows for the specified email address. */
    generatePasswordResetLink(email: string, settings: FirebaseAdmin.Auth.ActionCodeSettings): string;
    /** Gets a UserRecord object containing information about the user identified by email. */
    getUserByEmail(email: string): FirebaseAdmin.Auth.UserRecord;
    /** Gets a UserRecord object containing information about the user identified by phoneNumber. */
    getUserByPhoneNumber(phoneNumber: string): FirebaseAdmin.Auth.UserRecord;
    /** Generates the out-of-band email action link for email link sign-in flows for the specified email address. */
    generateSignInWithEmailLink(email: string, settings: FirebaseAdmin.Auth.ActionCodeSettings): string;
  }

}
declare namespace KScript.Integration {
  interface KIntegration extends Kooboo.Sites.OpenApiGenerator.OpenApiKScriptBase {
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Analytics {
  interface kAnalytics {
    track(customName: string, parameter: any): void;
  }

}
declare namespace Kooboo.IntegrateCommerce {
  interface KIntegrateCommerce extends Kooboo.Data.Interface.IkScript {
    tiktok: Kooboo.Sites.Integration.IIntegrateCommerceProvider;
    shein: Kooboo.Sites.Integration.IIntegrateCommerceProvider;
    amazon: Kooboo.Sites.Integration.IIntegrateCommerceProvider;
    getLogFiles(): SummaryFileInfo[];
    getLogDetails(name: string): string;
    setOrderDeskCredentials(storeId: string, apiKey: string, ordersCallbackCodeBlock?: string): void;
    removeOrderDeskCredentials(storeId: string): void;
  }

  interface SummaryFileInfo {
    name: string;
    size: number;
    string_size: string;
    created_utc: Date;
    last_modified_utc: Date;
  }

  interface PlatformAuthState {
    ordersCallbackCodeBlock?: string;
    authCallbackCodeBlock?: string;
    authWebhookUrl?: string;
    extra?: string;
    region?: string;
  }

  interface PlatformOrderListQuery {
    from?: Date;
    to?: Date;
    pageNumber?: number;
    pageSize?: number;
    orderStatus?: string;
    keyword?: string;
  }

  interface PlatformOrderListPage {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    items: PlatformOrderSummary[];
  }

  interface PlatformOrderDetail {
    order_id?: string;
    channel_id?: string;
    customer?: PlatformOrderDetailCustomer;
    create_at?: string;
    currency?: PlatformOrderDetailCurrency;
    shipping_address?: PlatformOrderDetailShippingAddress;
    payment_method?: PlatformOrderDetailPaymentMethod;
    shipping_method?: PlatformOrderDetailShippingMethod;
    status?: PlatformOrderDetailStatus;
    totals?: PlatformOrderDetailTotals;
    order_products?: PlatformOrderDetailProduct[];
    modified_at?: string;
    finished_time?: string;
    comment?: string;
    store_id?: string;
    warehouses_ids?: string[];
    additional_fields?: Record<string, any>;
  }

  interface PlatformOrderSummary {
    storeId: string;
    platformCode: string;
    platformOrderId: string;
    platformCreatedAt: Date;
    platformUpdatedAt?: Date;
    orderStatus?: string;
    currency?: string;
    amountTotal?: number;
    buyerName?: string;
  }

  interface PlatformOrderDetailCustomer {
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    additional_fields?: Record<string, any>;
  }

  interface PlatformOrderDetailCurrency {
    name?: string;
    iso3?: string;
  }

  interface PlatformOrderDetailShippingAddress {
    first_name?: string;
    last_name?: string;
    postcode?: string;
    address1?: string;
    address2?: string;
    phone?: string;
    city?: string;
    country?: PlatformOrderDetailCountry;
    state?: PlatformOrderDetailState;
  }

  interface PlatformOrderDetailPaymentMethod {
    name?: string;
    additional_fields?: Record<string, any>;
  }

  interface PlatformOrderDetailShippingMethod {
    name?: string;
    additional_fields?: Record<string, any>;
  }

  interface PlatformOrderDetailStatus {
    name?: string;
    additional_fields?: Record<string, any>;
  }

  interface PlatformOrderDetailTotals {
    total?: number;
    subtotal?: number;
    shipping?: number;
    tax?: number;
    discount?: number;
    additional_fields?: Record<string, any>;
  }

  interface PlatformOrderDetailProduct {
    product_id?: string;
    order_product_id?: string;
    sku?: string;
    sku_image?: string;
    seller_sku?: string;
    name?: string;
    price?: number;
    price_inc_tax?: number;
    quantity?: number;
    options?: PlatformOrderDetailProductOption[];
    variant_id?: string;
    weight_unit?: string;
    weight?: number;
    additional_fields?: Record<string, any>;
    attachments?: Record<string, SummaryFileInfo[]>;
  }

  interface PlatformOrderDetailCountry {
    code2?: string;
    code3?: string;
    name?: string;
  }

  interface PlatformOrderDetailState {
    code?: string;
    name?: string;
  }

  interface PlatformOrderDetailProductOption {
    option_id?: string;
    name?: string;
    value?: string;
    product_option_value_id?: string;
  }

  interface SummaryFileInfo {
    name: string;
    size: number;
    string_size: string;
    created_utc: Date;
    last_modified_utc: Date;
  }

}
declare namespace Kooboo.Sites.Storage {
  interface KStorage extends Kooboo.Data.Interface.IkScript {
    aliyunOSS: IStorageClient;
    amazonS3: IStorageClient;
    azureBlob: IStorageClient;
    get(name: string): IStorageClient;
  }

  interface IStorageClient {
    /** ```ts
const path = "/media";
const page1 = k.storage.{name}.listObjects(path);
if (page1.hasMore) {
    const page2 = k.storage.{name}.listObjects(path, {
        takeCount: 10,
        startAfter: page1.files[page1.files.length - 1].key
    });
}
```
 */
    listObjects(path: string, options?: QueryOptions): ListObjectsResponse;
    /** ```ts
const path = "/media";
const keyword = "kooboo";
const page1 = k.storage.{name}.searchObjects(path, keyword);
if (page1.hasMore) {
    const page2 = k.storage.{name}.searchObjects(path, keyword, {
        takeCount: 10,
        startAfter: page1.files[page1.files.length - 1].key
    });
}
```
 */
    searchObjects(path: string, keyword: string, options?: QueryOptions): SearchObjectsResponse;
    /** ```ts
const file = k.request.files[0];
const key = `/media/my-folder/${file.fileName}`;
const result = k.storage.{name}.putObject(key, file.bytes, {
    alt: file.fileName
});
```
 */
    putObject(key: string, bytes: number[], metas?: Record<string, any>): RawStorageObjectModel;
    copyObject(oldKey: string, newKey: string): boolean;
    /** ```ts
k.storage.{name}.createFolder("/media/my-folder/")
```
 */
    createFolder(key: string): RawStorageFolderModel;
    /** ```ts
const isValidKey = k.storage.{name}.isUniqueKey(key);
if (!isValidKey) {
    throw new Error(`Duplicated key: ${key}`);
}
```
 */
    isUniqueKey(key: string): boolean;
    deleteObjects(keys: string[]): boolean;
    deleteFolders(keys: string[]): boolean;
    generateDownloadUrl(key: string): string;
    getMetadata(key: string): Record<string, string>;
    putMetadata(key: string, metadata: Record<string, any>): boolean;
  }

  interface MediaStorageFileModel extends StorageObjectModel {
    thumbnail: string;
    height: number;
    width: number;
    isImage: boolean;
    type: string;
    alt: string;
    references: Record<string, number>;
    folder: string;
    previewUrl: string;
    mimeTypeOverride: string;
    mimeType: string;
    id: any;
    key: string;
    url: string;
    name: string;
    size: number;
    downloadUrl: string;
    lastModified: Date;
    headers: Record<string, string>;
  }

  interface QueryOptions {
    takeCount?: number;
    startAfter: string;
  }

  interface ListObjectsResponse extends SearchObjectsResponse {
    folders: RawStorageFolderModel[];
    files: RawStorageObjectModel[];
    hasMore: boolean;
    lastModified: Date;
  }

  interface SearchObjectsResponse {
    files: RawStorageObjectModel[];
    hasMore: boolean;
    lastModified: Date;
  }

  interface RawStorageObjectModel {
    id: any;
    key: string;
    url: string;
    name: string;
    size: number;
    downloadUrl: string;
    lastModified: Date;
    headers: Record<string, string>;
  }

  interface RawStorageFolderModel {
    key: string;
    name: string;
  }

  interface StorageObjectModel extends RawStorageObjectModel {
    folder: string;
    previewUrl: string;
    mimeTypeOverride: string;
    mimeType: string;
    id: any;
    key: string;
    url: string;
    name: string;
    size: number;
    downloadUrl: string;
    lastModified: Date;
    headers: Record<string, string>;
  }

}
declare namespace Kooboo.Sites.Scripting.Extension {
  interface StapTest extends Kooboo.Data.Interface.IkScript {
    name: string;
    context: Kooboo.Data.Context.RenderContext;
    appendx(input: string): string;
    anythingOpleiding(input: string): string;
  }

  interface Converter extends Kooboo.Data.Interface.IkScript {
    name: string;
    context: Kooboo.Data.Context.RenderContext;
    /** Convert html to pdf document;

```
var rsp = k.utils.converter.htmlToPdf("<div>hello</div>", [{
    text: "current $pageIndex / total $pageCount",
    color: { r: 255, g: 0, b: 0 },
    location: { x: 90, y: 10, align: "right" }
}, {
    text: "kooboo.com",
    color: { r: 255, g: 0, b: 0 },
    location: { x: 10, y: 10}
}]);
k.file.writeBinary("1.pdf", rsp)
``` */
    htmlToPdf(htmlcode: string, appendTexts?: Kooboo.Data.Models.Converter.AppendText[]): number[];
    gifToWebp(gif: number[]): number[];
    officeToHTML(officebytes: number[], filename: string): string;
    officeToCleanHTML(officebytes: number[], filename: string): string;
  }

}
declare namespace Kooboo.Sites.Payment {
  interface kPay extends Kooboo.Data.Interface.IkScript {
    square: Kooboo.Sites.Payment.Methods.SquareCheckout;
    wechat: Kooboo.Sites.Payment.Methods.WeChatNative;
    wechatApp: Kooboo.Sites.Payment.Methods.wechat.WeChatApp;
    weChatH5: Kooboo.Sites.Payment.Methods.wechat.WeChatH5;
    wechatJsApi: Kooboo.Sites.Payment.Methods.wechat.WeChatJsApi;
    stripeCheckout: Kooboo.Sites.Payment.Methods.Stripe.StripeCheckout;
    stripe: Kooboo.Sites.Payment.Methods.Stripe.StripePaymentIntent;
    paynlCheckout: Kooboo.Sites.Payment.Methods.Paypal.PaynlCheckout;
    paypalCheckout: Kooboo.Sites.Payment.Methods.Paypal.PaypalCheckout;
    paypalForm: Kooboo.Sites.Payment.Methods.Paypal.PaypalForm;
    twoCheckout: Kooboo.Sites.Payment.Methods.Paypal.TwoCheckout;
    moneyBoxs: Kooboo.Sites.Payment.Methods.MoneyBoxs.MoneyBoxs;
    alipayApp: Kooboo.Sites.Payment.Methods.Alipay.AlipayApp;
    alipayForm: Kooboo.Sites.Payment.Methods.Alipay.AlipayForm;
    alipayH5: Kooboo.Sites.Payment.Methods.Alipay.AlipayH5;
    get(PaymentMothod: string): IPaymentMethod;
    getRequest(requestId: string): PaymentRequest;
  }

  interface IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    checkStatus(request: PaymentRequest): PaymentStatusResponse;
  }

  interface PaymentRequest extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.IGolbalObject, Kooboo.Sites.Models.CoreObject {
    id: any;
    description: string;
    totalAmount: number;
    currency: string;
    country: string;
    orderId: any;
    order: string;
    userIp: string;
    paymentMethod: string;
    paid: boolean;
    failed: boolean;
    code: string;
    callbackCodeName: string;
    referenceId: string;
    referenceIdHash: any;
    returnPath: string;
    returnUrl: string;
    cancelUrl: string;
    additional: Record<string, any>;
    card: Kooboo.Sites.Payment.Models.Card;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface PaymentStatusResponse {
    hasResult: boolean;
    paid: boolean;
    failed: boolean;
    status: PaymentStatus;
    message: string;
  }

  interface ChargeResponse {
    paid: boolean;
    requestId: any;
    paymentMethodReferenceId: string;
    nextAction: NextAction;
  }

  interface PaymentCallback extends Kooboo.Data.IGolbalObject, Kooboo.Data.Interface.ISiteObject {
    id: any;
    requestId: any;
    responseMessage: string;
    rawData: string;
    /** The call back relative url includes query string */
    requestUrl: string;
    /** Form post data */
    postData: string;
    /** Orginal request data */
    request: KScript.KDictionary;
    paid: boolean;
    cancelled: boolean;
    rejected: boolean;
    pending: boolean;
    status: PaymentStatus;
    creationDate: Date;
    lastModified: Date;
    name: string;
  }

  type PaymentStatus = 'NotAvailable' | 'Authorized' | 'Pending' | 'Paid' | 'Cancelled' | 'Rejected';

  interface NextAction {
    /** qrcode 3dSecure...  */
    type: string;
    /** 
```
k.response.write(responseData)
```        
         */
    responseData: string;
    /** 
```
<div env='server' v-html='renderHtml'><div>
```        
         */
    renderHtml: string;
    /** 
```
k.response.redirect(redirectUrl)
```        
         */
    redirectUrl: string;
  }

  interface IPaymentSetting extends Kooboo.Data.Interface.ISiteSetting {
  }

}
declare namespace Kooboo.Lib.GeoLocation {
  interface CountryLocationModel {
    countryCode: string;
    continent: string;
    latitude: number;
    longtitude: number;
  }

}
declare namespace Kooboo.Sites.Models {
  interface Page extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, IDomObject, Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.IScriptable, DomObject {
    headers: HtmlHeader;
    id: any;
    layoutName: string;
    hasLayout: boolean;
    isStatic: boolean;
    isSecure: boolean;
    type: PageType;
    defaultStart: boolean;
    parameters: Record<string, string>;
    requestParas: string[];
    disableUnocss: boolean;
    enableCache: boolean;
    cacheByVersion: boolean;
    cacheVersionType: Kooboo.Sites.Render.Type;
    cacheByDevice: boolean;
    cacheByCulture: boolean;
    cacheMinutes: number;
    cacheQueryKeys: string;
    designConfig: string;
    body: string;
    name: string;
    dom: Kooboo.Dom.Document;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    dispose(): void;
    clone(): any;
  }

  interface ScriptModule extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    packageName: string;
    moduleVersion: string;
    relativeFolder: string;
    startView: string;
    settings: string;
    taskJs: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface HtmlHeader extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    titles: Record<string, string>;
    customHeader: string;
    metas: HtmlMeta[];
    styles: string[];
    scripts: string[];
    isPwa: boolean;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    hasValue(): boolean;
    getTitle(culture?: string): string;
    setTitle(value: string, culture?: string): void;
    clone(): any;
  }

  type PageType = 'Normal' | 'Layout' | 'RichText' | 'Designer';

  interface IDomObject extends Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.ISiteObject {
    dom: Kooboo.Dom.Document;
  }

  interface DomObject extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, IDomObject, Kooboo.Data.Interface.ITextObject, CoreObject {
    body: string;
    name: string;
    dom: Kooboo.Dom.Document;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    dispose(): void;
    clone(): any;
  }

  interface CoreObject extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, SiteObject {
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface View extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, IDomObject, Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.IExtensionable, Kooboo.Data.Interface.IScriptable, DomObject {
    id: any;
    name: string;
    moduleId: any;
    extension: string;
    parameters: Record<string, string>;
    propDefines: Kooboo.Sites.Contents.Models.ContentProperty[];
    asPageElement: boolean;
    displayName: string;
    cover: string;
    requestParas: string[];
    enableCache: boolean;
    cacheByVersion: boolean;
    cacheVersionType: Kooboo.Sites.Render.Type;
    cacheByDevice: boolean;
    cacheByCulture: boolean;
    cacheMinutes: number;
    cacheQueryKeys: string;
    body: string;
    dom: Kooboo.Dom.Document;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    dispose(): void;
    clone(): any;
  }

  interface Layout extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, IDomObject, Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.IExtensionable, DomObject {
    id: any;
    name: string;
    extension: string;
    body: string;
    dom: Kooboo.Dom.Document;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    dispose(): void;
    clone(): any;
  }

  interface Script extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IEmbeddable, Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.IExtensionable, CoreObject {
    id: any;
    name: string;
    engine: string;
    isEmbedded: boolean;
    extension: string;
    ownerObjectId: any;
    ownerConstType: number;
    koobooOpenTag: string;
    itemIndex: number;
    bodyHash: number;
    type: string;
    async: boolean;
    defer: boolean;
    crossOrigin: string;
    body: string;
    domTagName: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    clone(): any;
  }

  interface Style extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IEmbeddable, Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.IExtensionable, CoreObject {
    id: any;
    name: string;
    engine: string;
    isEmbedded: boolean;
    extension: string;
    bodyHash: number;
    displayName: string;
    ownerObjectId: any;
    ownerConstType: number;
    koobooOpenTag: string;
    itemIndex: number;
    media: string;
    type: string;
    body: string;
    source: string;
    sourceChange: boolean;
    domTagName: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    clone(): any;
  }

  interface Image extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IBinaryFile, Kooboo.Data.Interface.IExtensionable, CoreObject {
    id: any;
    name: string;
    alt: string;
    extension: string;
    isSvg: boolean;
    height: number;
    width: number;
    size: number;
    contentBytes: number[];
    bytes: number[];
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    resetSize(): void;
    clone(): any;
  }

  interface CmsFile extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IBinaryFile, Kooboo.Data.Interface.IExtensionable, CoreObject {
    id: any;
    extension: string;
    contentBytes: number[];
    contentString: string;
    contentType: string;
    size: number;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface SiteObject extends Kooboo.Data.Interface.ISiteObject {
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface HtmlMeta {
    name: string;
    httpequiv: string;
    property: string;
    content: Record<string, string>;
    charset: string;
    getContent(culture?: string): string;
    setContent(value: string, culture?: string): void;
  }

  type CodeType = 'Event' | 'Datasource' | 'Job' | 'Api' | 'PageScript' | 'Diagnosis' | 'PaymentCallBack' | 'Authentication' | 'Authorization' | 'CodeBlock';

  interface Path {
    parentPath: Path;
    segment: string;
    children: Record<string, Path>;
    routeId: any;
    objectId: any;
    partialWildCard: boolean;
    partialParts: string[];
  }

  interface SyncSetting extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    uniqueId: any;
    orgId: any;
    serverName: string;
    remoteWebSiteId: any;
    remoteSiteName: string;
    remoteServerUrl: string;
    ignoreOutStoreNames: string[];
    ignoreInStoreNames: string[];
    accessToken: string;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface CssClassName extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    className: string;
    ownerObjectId: any;
    ownerObjectConstType: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface CoreSetting extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    values: Record<string, string>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface SiteCluster extends Kooboo.Data.Interface.ISiteObject {
    id: any;
    serverId: number;
    serverIp: string;
    port: number;
    isSelected: boolean;
    dataCenter: string;
    isRoot: boolean;
    primaryDomain: string;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    name: string;
  }

  interface Menu extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    rootId: any;
    id: any;
    template: string;
    url: string;
    subItemContainer: string;
    subItemTemplate: string;
    tempdata: TempData;
    children: Menu[];
    parent: Menu;
    parentId: any;
    dataSourceId: any;
    mappings: Record<string, string>;
    values: Record<string, string>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    addSubMenu(submenu: Menu): void;
    clone(): any;
  }

  interface Folder extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    objectConstType: number;
    fullPath: string;
    segment: string;
    name: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    clone(): any;
  }

  interface Form extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IEmbeddable, Kooboo.Data.Interface.ITextObject, CoreObject {
    body: string;
    engine: string;
    style: string;
    id: any;
    attributes: Record<string, string>;
    method: string;
    fields: string;
    redirectUrl: string;
    allowAjax: boolean;
    successCallBack: string;
    failedCallBack: string;
    koobooId: string;
    ownerObjectId: any;
    koobooOpenTag: string;
    ownerConstType: number;
    isEmbedded: boolean;
    bodyHash: number;
    itemIndex: number;
    domTagName: string;
    setting: Record<string, string>;
    formSubmitter: string;
    isSelfRefresh: boolean;
    formType: FormType;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface FormSetting extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    formId: any;
    enable: boolean;
    method: string;
    redirectUrl: string;
    allowAjax: boolean;
    successCallBack: string;
    failedCallBack: string;
    setting: Record<string, string>;
    formSubmitter: string;
    isSelfRefresh: boolean;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface FormValue extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    formId: any;
    values: Record<string, string>;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface ViewDataMethod extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    aliasName: string;
    methodId: any;
    viewId: any;
    children: ViewDataMethod[];
    hasChildren: boolean;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface CommerceData extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    body: string;
    bodyHash: number;
    type: CommerceDataType;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface MediaMetadata extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    type: string;
    values: Record<string, string>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    generateId(name: string, settingName: string): any;
    clone(): any;
  }

  interface Code extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.ITextObject, Kooboo.Data.Interface.IEmbeddable, Kooboo.Data.Interface.IExtensionable, CoreObject {
    isDecrypted: boolean;
    isCodeEncrypted: boolean;
    lang: string;
    id: any;
    extension: string;
    body: string;
    bodyHash: number;
    config: string;
    eventType: Kooboo.Sites.FrontEvent.enumEventType;
    codeType: CodeType;
    isJson: boolean;
    cors: boolean;
    ownerObjectId: any;
    ownerConstType: number;
    isEmbedded: boolean;
    koobooOpenTag: string;
    engine: string;
    itemIndex: number;
    domTagName: string;
    parameters: string[];
    scriptType: Kooboo.Data.ScriptType;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface BusinessRule extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    eventType: Kooboo.Sites.FrontEvent.enumEventType;
    rule: IFElseRule;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface DownloadFailTrack extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    historyTime: Date[];
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface SiteUser extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    userId: any;
    role: Kooboo.Sites.Authorization.EnumUserRole;
    siteRole: string;
    visibleAdvancedMenus: string;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface ResourceGroup extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    type: number;
    children: Record<any, number>;
    extension: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface CmsCssRule extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    itemIndex: number;
    tempCssRuleIndex: number;
    duplicateIndex: number;
    parentStyleId: any;
    parentCssRuleId: any;
    cssText: string;
    selectorPositionIndex: number;
    selectorText: string;
    ruleText: string;
    isInline: boolean;
    ownerObjectId: any;
    ownerObjectConstType: number;
    koobooId: string;
    koobooOpenTag: string;
    displayName: string;
    ruleType: RuleType;
    properties: string[];
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface CmsCssRuleChanges {
    cssRuleId: any;
    selectorText: string;
    declarationText: string;
    changeType: Kooboo.ChangeType;
    parentCssRuleId: any;
    cssText: string;
    parentStyleId: any;
    ownerObjectId: any;
    ownerConstType: number;
  }

  interface ChangePlan {
    startIndex: number;
    endIndex: number;
    changeInto: string;
  }

  interface ExternalResource extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    name: string;
    destinationObjectType: number;
    fullUrl: string;
    urlHash: any;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    clone(): any;
  }

  interface Thumbnail extends Kooboo.Data.Interface.ISiteObject, SiteObject {
    id: any;
    imageId: any;
    height: number;
    width: number;
    contentBytes: number[];
    extension: string;
    contentType: string;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface KConfig extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    binding: Record<string, string>;
    tagName: string;
    tagHtml: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface Authentication extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    matcher: MatcherType;
    conditions: Kooboo.Sites.FrontEvent.Condition[];
    action: AuthenticationAction;
    failedAction: FailedAction;
    customCodeName: string;
    customCode: string;
    url: string;
    httpCode: number;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface OpenApi extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    jsonData: string;
    url: string;
    baseUrl: string;
    authUrl: string;
    type: string;
    customAuthorization: string;
    useCustomCode: boolean;
    code: string;
    useCommaArray: boolean;
    caches: Cache[];
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface SiteJob extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    startTime: Date;
    active: boolean;
    finish: boolean;
    repeat: boolean;
    frequence: Kooboo.IndexedDB.Schedule.RepeatFrequence;
    frequenceUnit: number;
    code: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface UserOptions extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    id: any;
    display: string;
    data: string;
    schema: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface SpaMultilingual extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    value: Record<string, string>;
    defaultLang: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface OpenApiAuthorize extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, CoreObject {
    constType: number;
    name: string;
    openApiName: string;
    authorizeName: string;
    securities: Record<string, Security>;
    online: boolean;
    version: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    clone(): any;
  }

  interface TempData {
    endIndex: number;
    startIndex: number;
  }

  type FormType = 'Normal' | 'KoobooForm';

  type CommerceDataType = 'ProductType' | 'Product' | 'ProductVariant' | 'Category' | 'Discount' | 'ProductCategory' | 'Settings' | 'Shipping' | 'DigitalShipping' | 'Membership' | 'Tax';

  interface IFElseRule {
    iF: Kooboo.Sites.FrontEvent.Condition[];
    then: IFElseRule[];
    else: IFElseRule[];
    do: Action[];
    id: any;
  }

  type RuleType = 'StyleRule' | 'MediaRule' | 'ImportRule' | 'FontFaceRule';

  type MatcherType = 'None' | 'Any' | 'Condition';

  type AuthenticationAction = 'None' | 'JwtAuth' | 'CustomCode';

  type FailedAction = 'None' | 'ResultCode' | 'Redirect';

  interface Cache {
    method: string;
    pattern: string;
    expiresIn: number;
  }

  interface Security {
    username: string;
    password: string;
    clientId: string;
    clientSecret: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: Date;
    redirectUrl: string;
    name: string;
  }

  interface Action {
    codeId: any;
    code: string;
    codeSettings: string;
    setting: Record<string, string>;
  }

}
declare namespace KScript.Net.Http {
  interface KHttpClient {
    createJsonContent(body: any): KHttpContent;
    createStringContent(body: string): KHttpContent;
    createFormUrlEncodedContent(body: any): KHttpContent;
    createMultipartFormDataContent(): KMultipartHttpContent;
    /** Create a batch request
```
var request = k.net.httpClient.createBatchRequest();
var task = request.addTask("https://kooboo.com/1.png", "get");
task.responseType = "File",
task.savePath = i + ".png"
var task2 = request.addTask("https://kooboo.com/info.json", "get");
task.responseType = "String"
``` */
    createBatchRequest(): KBatchRequest;
    /** Post a json
```
const content = k.net.httpClient.createJsonContent({
    name: "alex",
    age: 23
});
const response = k.net.httpClient.send("https://kooboo.com", "post", content);
var result = response.bodyString();
k.response.write(result);
```

Post a form data with file
```
const content = k.net.httpClient.createMultipartFormDataContent();
content.add("name", "jobs");
content.addFile("sticker", "1.png", k.file.readBinary("1.png"))
const response = k.net.httpClient.send("https://kooboo.com", "post", content);
var result = response.bodyString();
k.response.write(result)
``` */
    send(url: string, method: string, content?: KHttpContent, headers?: any, timeout?: number): KHttpResponse;
    /** Send a batch request
```
var request = k.net.httpClient.createBatchRequest();
var task = request.addTask("https://kooboo.com/1.png", "get");
task.responseType = "File",
task.savePath = i + ".png"
k.net.httpClient.send(request);
var isSuccess= request.tasks[0].isSuccess; // is true
var errorMessage= request.tasks[0].errorMessage; // request error info
var fileResult= request.tasks[0].fileResult; // saved file info
``` */
    send(request: KBatchRequest): void;
  }

  interface KHttpContent {
    getHeader(name: string): string[];
    setHeader(name: string, value: string): void;
  }

  interface KMultipartHttpContent extends KHttpContent {
    addFile(name: string, fileName: string, binary: number[], contentType?: string): void;
    add(name: string, value: string): void;
    getHeader(name: string): string[];
    setHeader(name: string, value: string): void;
  }

  interface KBatchRequest {
    tasks: RequestTask[];
    addTask(url: string, method: string): RequestTask;
  }

  interface KHttpResponse {
    contentDisposition?: KContentDisposition;
    contentType?: KContentType;
    success: boolean;
    statusCode: number;
    getHeader(name: string): string[];
    bodyString(): string;
    /** To save file, use save or saveBinary Instead */
    bodyBinary(): number[];
    /** Save response to fileIO */
    save(path: string): KScript.FileInfo;
    /** Save response to fileIO */
    saveBinary(path: string): KScript.FileInfo;
  }

  interface RequestTask {
    url: string;
    method: string;
    timeout: number;
    content: KHttpContent;
    header: any;
    responseType: ResponseType;
    savePath: string;
    isSuccess: boolean;
    statusCode: number;
    errorMessage: string;
    fileResult: KScript.FileInfo;
    stringResult: string;
    binaryResult: number[];
  }

  interface KContentDisposition {
    fileName?: string;
    size?: number;
  }

  interface KContentType {
    mediaType: string;
    charSet: string;
  }

  type ResponseType = 'String' | 'Binary' | 'File';

}
declare namespace KScript.Ssh {
  interface SshClient {
    /** ```ts
k.utils.sshClient.passwordConnect('x.x.x.x','root','password',client=>{
    var result = client.RunCommand('ls')
})
```
 */
    passwordConnect(host: string, user: string, password: string, callback: (p1:KScript.Ssh.ConnectedClient,)=>void, timeout?: number): void;
    /** ```ts
// Generate supported keys
// ssh-keygen -m PEM -t rsa -b 4096 -f /<save_path>/<myhost>_rsa -P \"\"
k.utils.sshClient.privateKeyConnect('x.x.x.x','root','privateKey',client=>{
    var result = client.RunCommand('ls')
})
```
 */
    privateKeyConnect(host: string, user: string, privateKey: string, callback: (p1:KScript.Ssh.ConnectedClient,)=>void, timeout?: number): void;
  }

  interface ConnectedClient {
    runCommand(command: string, timeout?: number): string;
  }

}
declare namespace KScript.Sftp {
  interface SftpClient {
    /** ```ts
k.utils.sftpClient.passwordConnect('x.x.x.x','root','password',client=>{
    var result = client.Download('/root/1.txt')
})
```
 */
    passwordConnect(host: string, user: string, password: string, callback: (p1:KScript.Sftp.ConnectedClient,)=>void, timeout?: number): void;
    /** ```ts
// Generate supported keys
// ssh-keygen -m PEM -t rsa -b 4096 -f /<save_path>/<myhost>_rsa -P \"\"
k.utils.sftpClient.privateKeyConnect('x.x.x.x','root','privateKey',client=>{
    var result = client.Download('/root/1.txt')
})
```
 */
    privateKeyConnect(host: string, user: string, privateKey: string, callback: (p1:KScript.Sftp.ConnectedClient,)=>void, timeout?: number): void;
  }

  interface ConnectedClient {
    upload(data: number[], path: string): void;
    download(path: string): number[];
  }

}
declare namespace KScript.Telnet {
  interface TelnetClient {
    /** ```ts
k.utils.telnetClient.connect('x.x.x.x',25,client=>{
    client.Read(); // 220 Kooboo Smtp Server is ready
    client.WriteLine('HELO localhost');
    client.Read(); // Hello localhost Kooboo Smtp Server
})
```
 */
    connect(host: string, port: number, callback: (p1:KScript.Telnet.ConnectedClient,)=>void, timeout?: number): void;
  }

  interface ConnectedClient {
    terminatedRead(terminator: string, timeout?: number): string;
    read(timeout?: number): string;
    write(command: string): void;
    writeLine(command: string): void;
  }

}
declare namespace Kooboo.Sites.DataTraceAndModify.Marker {
  interface ItemTraceModel {
    source: string;
    dataType: string;
    info: Record<string, string>;
    setFieldName(name: string): void;
    copy(): ItemTraceModel;
  }

}
declare namespace Kooboo.Sites.ViewModel {
  interface ModuleSearchResult {
    packageId: string;
    title: string;
    description: string;
  }

  interface SimpleSiteItemViewModel {
    id: any;
    name: string;
    lastVersion: number;
    url: string;
  }

  interface DiskSize {
    total: number;
    totalSize: string;
    repositorySize: RepoSize[];
    repositoryEditCount: number;
  }

  interface RepoSize {
    name: string;
    length: number;
    itemCount: number;
    size: string;
  }

  interface EmbeddedBy {
    folderName: string;
    displayName: string;
    folderId: any;
  }

  interface TextContentViewModel extends Kooboo.Data.Interface.IDynamic, Kooboo.Sites.DataTraceAndModify.ITraceability {
    id: any;
    userKey: string;
    folderId: any;
    parentId: any;
    contentTypeId: any;
    order: number;
    summaryField: string;
    usedBy: UsedByViewModel[];
    item: any;
    lastModified: Date;
    creationDate: Date;
    online: boolean;
    values: Record<string, any>;
    source: string;
    getValue(FieldName: string): any;
    setValue(FieldName: string, Value: any): void;
    getValue(FieldName: string, Context: Kooboo.Data.Context.RenderContext): any;
    getTraceInfo(): any;
  }

  interface UsedByViewModel extends EmbeddedBy {
    type: UsedByType;
    contents: UsedByContentViewModel[];
    folderName: string;
    displayName: string;
    folderId: any;
  }

  type UsedByType = 'Unknown' | 'Embedded' | 'Category';

  interface UsedByContentViewModel {
    id: any;
    title: string;
    url: string;
  }

}
declare namespace Kooboo.Sites.ScriptModules.KModuleApi {
  interface KModuleFiles {
    context: Kooboo.Sites.ScriptModules.ModuleContext;
    type: Kooboo.Sites.ScriptModules.Models.ResourceType;
    readText(FileName: string): string;
    writeText(fileName: string, content: string): void;
    readBytes(FileName: string): number[];
    writeBytes(fileName: string, BinaryBytes: number[]): void;
    delete(fileName: string): void;
    files(): Kooboo.Sites.ScriptModules.ModuleFileInfo[];
  }

}
declare namespace Kooboo.Sites.Scripting.Global.EventTask {
  interface KTask {
    hour(hour: number): KTask;
    minute(minutes: number): KTask;
    day(day: number): KTask;
    run(js: any): void;
  }

  interface KEvent {
    onViewFound(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.ViewPara,)=>void): void;
    onViewFinding(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.ViewPara,)=>void): void;
    onViewNotFound(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.ViewPara,)=>void): void;
    onPageFound(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.PagePara,)=>void): void;
    onPageFinding(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.PagePara,)=>void): void;
    onRouteFound(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.RoutePara,)=>void): void;
    onRouteFinding(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.RoutePara,)=>void): void;
    onRouteNotFound(js: (p1:Kooboo.Sites.Scripting.Global.EventTask.RoutePara,)=>void): void;
  }

  interface ViewPara {
    name: string;
    view: Kooboo.Sites.Models.View;
  }

  interface PagePara {
    url: string;
    culture: string;
    page: Kooboo.Sites.Models.Page;
  }

  interface RoutePara {
    url: string;
    userAgent: string;
    culture: string;
    route: Kooboo.Sites.Routing.Route;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Sqlite {
  interface SqliteDatabase extends Kooboo.Sites.Scripting.Interfaces.IRelationalDatabase, KScript.IDatabase {
    getTables(): string[];
    getTable(name: string): KScript.ITable;
    query(sql: string): KScript.IDynamicTableObject[];
    query<T>(sql: string): T;
    operators(): KScript.Operators;
    query(sql: string, param?: any): KScript.IDynamicTableObject[];
    query<T>(sql: string, param?: any): T;
    execute(sql: string): number;
    execute(sql: string, param?: any): number;
    get(sql: string, param?: any): KScript.IDynamicTableObject;
    get<T>(sql: string, param?: any): T;
    value(sql: string, param?: any): any;
    value<T>(sql: string, param?: any): T;
    /** Procedure define:
```sql
CREATE PROCEDURE [dbo].[abc] @p = 0,
AS
    SELECT @p
```

Invoke:
```ts
k.DB.datebase.procedure("abc")
```
Result:
```json
[ { "a": 0} ]
``` */
    procedure(sql: string): any;
    /** Procedure define:
```sql
CREATE PROCEDURE [dbo].[abc] @p1 int = 0, @p2 int
AS
    SELECT a=@p1, b=@p2
```

Invoke:
```ts
k.DB.datebase.procedure("abc",{
param2: 34
})
```

Result:
```json
[ { "a": 0, "b": 34 } ]
``` */
    procedure(sql: string, param?: any): any;
    transaction(action: Function): void;
  }

}
declare namespace Kooboo.Data.Models {
  interface User extends Kooboo.Data.IGolbalObject {
    id: any;
    currentOrgId: any;
    currentOrgName: string;
    isAdmin: boolean;
    userName: string;
    emailAddress: string;
    emailId: any;
    isEmailVerified: boolean;
    isTelVerified: boolean;
    tel: string;
    twoFAMethod: string;
    otpSecret: string;
    password: string;
    passwordHash: any;
    firstName: string;
    lastName: string;
    fullName: string;
    language: string;
    registerIp: string;
    kRef: string;
    tempRedirectUrl: string;
    oneTimeToken: string;
    currency: string;
    registrationDate: Date;
    lastModified: Date;
    role: string;
    throwIfNotAdmin(): void;
    getPasswordString(): string;
    clone(): User;
  }

  interface ThirdPartyLoginInfo {
    token: string;
    success: boolean;
    koobooUserName: string;
    thirdPartyUserName: string;
  }

  interface WebSite extends Kooboo.Data.IGolbalObject {
    id: any;
    organizationId: any;
    templateId: any;
    typeName: string;
    name: string;
    folderName: string;
    displayName: string;
    culture: Record<string, string>;
    defaultCulture: string;
    autoDetectCulture: boolean;
    enableHrefLang: boolean;
    defaultLanguagePrefix: boolean;
    continueDownload: boolean;
    published: boolean;
    status: SiteStatus;
    localRootPath: string;
    enableCluster: boolean;
    mirrorWebSiteBaseUrl: string;
    enableVisitorLog: boolean;
    enableImageLog: boolean;
    enableSqlLog: boolean;
    enableSitePath: boolean;
    enableFullTextSearch: boolean;
    enableMultilingual: boolean;
    enableConstraintFixOnSave: boolean;
    enableCORS: boolean;
    enableFrontEvents: boolean;
    enableBackendEvents: boolean;
    enablePageInteraction: boolean;
    enableConstraintChecker: boolean;
    enableCache: boolean;
    enableECommerce: boolean;
    enablePublicModule: boolean;
    enableSystemRoute: boolean;
    enableAbTest: boolean;
    enableFileIOUrl: boolean;
    enableJsCssCompress: boolean;
    enableJsCssBrowerCache: boolean;
    enableImageBrowserCache: boolean;
    enableImageAlt: boolean;
    enableVideoBrowserCache: boolean;
    enableSPA: boolean;
    enableResourceCDN: boolean;
    enableVisitorCountryRestriction: boolean;
    visitorCountryOnlyAllowIncluded: boolean;
    visitorCountryRestrictions: Record<string, string>;
    visitorCountryRestrictionPage: string;
    imageCacheDays: number;
    creationDate: Date;
    continueConvert: boolean;
    previewUrl: string;
    baseUrl: string;
    lastUpdateTime: number;
    ssoLogin: boolean;
    customErrors: Record<number, string>;
    customSettings: Record<string, string>;
    forceSSL: boolean;
    siteType: Kooboo.Data.Definition.WebsiteType;
    whiteListPath: string[];
    specialPath: string[];
    includePath: boolean;
    isApp: boolean;
    automateCovertImageToWebp: boolean;
    enableLighthouseOptimization: boolean;
    enableCssSplitByMedia: boolean;
    mobileMaxWidth: string;
    desktopMinWidth: string;
    defaultDatabase: Kooboo.Data.Definition.DefaultDatabase;
    lighthouseSettingsJson: string;
    pwa: Kooboo.Data.Pwa.PwaSettings;
    aI: Kooboo.Data.Models.AI.AISettings;
    codeLogSettings: Kooboo.Data.Logging.CodeLogSettings;
    sitemapSettings: Kooboo.Data.Sitemap.SitemapSettings;
    unocssSettings: Kooboo.Data.Unocss.UnocssSettings;
    canonicalURLSetting: CanonicalURLSetting;
    navigationFlowSetting: NavigationFlowSetting;
    resourceGuardianSetting: ResourceGuardianSetting;
    rateLimitSettings: Kooboo.Data.RateLimits.RateLimitSettings;
    accessLimitSettings: Kooboo.Data.RateLimits.AccessLimitSettings;
    cookieConsentSetting: CookieConsentSetting;
    visibleAdvancedMenus: string[];
    enableTinymceToolbarSettings: boolean;
    tinymceToolbarSettings: string;
    tinymceSettings: Record<string, any>;
    codeSuggestions: string[];
    recordSiteLogVideo: boolean;
    devPassword: string;
    blockingSeo: boolean;
    codeOpenApiSettings: string;
    inlineDesignSettings: InlineDesignSettings;
    nameToId(webSiteName: string, OrgId: any): any;
    getLighthouseItemSetting(lighthouseItemName: string): any;
    siteDb(): Kooboo.Sites.Repository.SiteDb;
    fullStartUrl(): string;
    baseUrl(path?: string): string;
    bindingHost(): string;
    startPages(): Kooboo.Sites.Models.Page[];
    startRoutePath(): string;
  }

  interface Domain extends Kooboo.Data.IGolbalObject {
    id: any;
    domainName: string;
    organizationId: any;
    expiration: Date;
    isKoobooDns: boolean;
    cMSLogin: boolean;
    dataCenter: string;
    nameServer: string;
    siteCDN: boolean;
    iCPCert: string;
    resourceCDN: boolean;
    mailOnly: boolean;
    bimiLogo: string;
    bimiVMC: string;
    source: string;
    sudDomainUseDash: boolean;
  }

  interface SubscriptionRequest {
    paymentMethodId: string;
    newCard: NewCard;
    redirectUrl: string;
    /** 1000 = 10USD */
    amount: number;
    /** USD */
    currency: string;
    /** basic premium ... */
    plan: string;
    /** Your app name like: previewinbox kooboo ... */
    name: string;
    /** 1 = month , 3 = quarter , 12 = year */
    cycleMonth: number;
  }

  interface Subscription {
    id: any;
    userId: any;
    startTime: Date;
    expireTime: Date;
    isStaging: boolean;
    state: string;
    paymentIntentId: string;
    paymentMethodId: string;
    redirectUrl: string;
    amount: number;
    currency: string;
    name: string;
    plan: string;
    cycleMonth: number;
    isActive(): boolean;
    renewal(): void;
  }

  interface OrgServerHost {
    organizationId: any;
    serverId: number;
    host: string;
    dataCenter: string;
    orgFullDomain: string;
    isDefault: boolean;
  }

  type SiteStatus = 'Published' | 'Development' | 'Auditing' | 'Forbidden';

  interface CanonicalURLSetting {
    enable: boolean;
    forceHttps: boolean;
    normalizeHomePage: boolean;
    canonicalDomain: string;
    ignoreQueryStringKey: string;
    ignoreKeys: string[];
  }

  interface NavigationFlowSetting {
    enable: boolean;
    goals: GoalModel[];
    stepStarter: StepGroup[];
    warningRate: number;
    riskyRate: number;
  }

  interface ResourceGuardianSetting {
    enableResourceLog: boolean;
    enableGuardian: boolean;
    protections: ResourceProtectionSetting[];
  }

  interface CookieConsentSetting {
    enable: boolean;
    displayRule: DisplayRule;
    category: CookieCategory[];
    cookieText: Record<string, CookieText>;
    resource: CategoryResource[];
    tagCategoryResource: Record<string, CategoryResource[]>;
    closeButton: closeButtonAction;
    uI: CookieUI;
    createDefaultText(culture: string): CookieText;
    createDefaultUI(): CookieUI;
  }

  interface InlineDesignSettings {
    clickElement: boolean;
    copyDom: boolean;
    editColor: boolean;
    editConfig: boolean;
    editContent: boolean;
    editDatabase: boolean;
    editDom: boolean;
    editHtmlBlock: boolean;
    editImage: boolean;
    editKeyValue: boolean;
    editLabel: boolean;
    editLink: boolean;
    editMenu: boolean;
    editProduct: boolean;
    editRepeater: boolean;
    editStyle: boolean;
    editSvg: boolean;
    editWidget: boolean;
    enterLink: boolean;
    removeDom: boolean;
    globalStyle: boolean;
    globalColor: boolean;
    globalImage: boolean;
    globalLink: boolean;
    globalText: boolean;
    updateSimilarPage: boolean;
  }

  interface VisitorLog extends Kooboo.Data.Storage.IWeeklyItem {
    id: number;
    clientIP: string;
    realIP: string;
    clientIPHash: any;
    hashSaltValidator: any;
    cookieConsent: string;
    sessionId: string;
    city: string;
    countryCode: string;
    continent: string;
    clientInfoLong: number;
    clientInfo: Kooboo.Lib.Utilities.UAParser.ClientInfo;
    application: string;
    browser: string;
    device: string;
    referer: string;
    refererHost: string;
    userAgent: string;
    secFetchSite: string;
    requestHost: string;
    hasCountryCH: boolean;
    eCT: string;
    downlink: number;
    rTT: number;
    dPR: number;
    colorScheme: Kooboo.Data.Logging.ColorScheme;
    viewportWidth: number;
    aSNDomain: string;
    iPUserType: Kooboo.Data.GeoLocation.IpUserType;
    isMobile: boolean;
    userId: any;
    customerId: string;
    customerIdHash: any;
    utm: string;
    isBot: boolean;
    botName: string;
    botScore: number;
    cartId: string;
    saltHash: any;
    begin: Date;
    end: Date;
    responseEnd: Date;
    size: number;
    timeSpan: number;
    millionSecondTake: number;
    pageName: string;
    constType: number;
    objectId: any;
    url: string;
    statusCode: number;
    entries: VisitorLogItem[];
    addEntry(Name: string, Value: string, StartTime: Date, EndTime: Date, StatusCode: number, Detail?: string): void;
  }

  interface CookieItem {
    name: string;
    value: string;
    domain: string;
    path: string;
    description: string;
    privacyLink: string;
    vendor: string;
    category: string;
    expiresMinutes?: number;
  }

  interface CookieConsentState {
    mode: string;
    categories: Record<string, boolean>;
    cookieValue: string;
  }

  interface CommerceState {
    cartId: string;
    customerId: string;
    orderId: string;
    clear(): void;
  }

  interface NewCard {
    name: string;
    number: string;
    expYear: string;
    expMonth: string;
    cvc: string;
  }

  interface GoalModel {
    goalId: number;
    objectId: any;
    nodeId: number;
    name: string;
    displayName: string;
    source: Source;
    description: string;
    warningRate: number;
    riskyRate: number;
    deduplicationMode: GoalDeduplicationMode;
    deduplicationWindowMinutes: number;
    entityKey: string;
  }

  interface StepGroup {
    nodeId: number;
    name: string;
    type: StepItemType;
    steps: ManualStepDefinition[];
    clone(): StepGroup;
  }

  interface ResourceProtectionSetting {
    priority: number;
    method: ProtectMethod;
    startPath: string;
    extension: string;
    blackListDomains: string[];
    watermark: WatermarkSetting;
    redirectUrl: string;
    matchPath(path: string): boolean;
    matchExtension(ext: string): boolean;
    isBlockedReferer(referer: string): boolean;
  }

  interface CookieText {
    title: string;
    description: string;
    introduction: string;
    iframeFallback: string;
    buttons: ButtonText;
    links: LinkText;
  }

  interface CookieUI {
    customTemplate: boolean;
    hTML: string;
    typeAndPosition: string;
    floatBall: boolean;
    theme: string;
    themeOption: CustomTheme;
  }

  interface DisplayRule {
    isInclude: boolean;
    type: string;
    countries: string[];
  }

  interface CookieCategory {
    id: string;
    name: Record<string, string>;
    description: Record<string, string>;
    required: boolean;
    defaultChecked: boolean;
  }

  interface CategoryResource {
    cookieCategory: string;
    tag: string;
    uRL: string;
    cookieItems: CookieDescription[];
  }

  interface CategoryResource {
    cookieCategory: string;
    tag: string;
    uRL: string;
    cookieItems: CookieDescription[];
  }

  interface closeButtonAction {
    show: boolean;
    action: string;
    getAction(countryCode: string): any;
  }

  interface VisitorLogItem {
    detail: string;
    startTime: Date;
    endTime: Date;
    timeSpan: number;
  }

  type DurationUnit = 'Year' | 'Month' | 'Week' | 'Day';

  interface UsedByRelation {
    objectId: any;
    constType: number;
    modelType: any;
    modelName: string;
    url: string;
    name: string;
    remark: string;
    extensions: any;
  }

  interface SiteErrorLog extends Kooboo.Data.Storage.IWeeklyItem {
    id: number;
    objId: any;
    url: string;
    clientIP: string;
    clientIPHash: any;
    hashSaltValidator: any;
    startTime: Date;
    message: string;
    statusCode: number;
  }

  interface DataMethodSetting extends Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IDataMethodSetting, Kooboo.Data.IGolbalObject, Kooboo.Data.Interface.ISiteObject {
    id: any;
    methodName: string;
    displayName: string;
    declareType: string;
    declareTypeHash: any;
    isThirdPartyType: boolean;
    originalMethodName: string;
    methodSignatureHash: any;
    isStatic: boolean;
    isVoid: boolean;
    parameters: Record<string, string>;
    parameterBinding: Record<string, ParameterBinding>;
    version: number;
    online: boolean;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    name: string;
    isGlobal: boolean;
    isPost: boolean;
    isTask: boolean;
    returnType: string;
    isPagedResult: boolean;
    description: string;
    isPublic: boolean;
    codeId: any;
    isKScript: boolean;
  }

  type SearchType = 'None' | 'FullTextSearch' | 'VectorSearch';

  type Source = 'Page' | 'Api' | 'Event' | 'Custom' | 'PageClick' | 'Others';

  type GoalDeduplicationMode = 'None' | 'ByEntity' | 'ByTimeWindow';

  type StepItemType = 'Page' | 'Goal';

  interface ManualStepDefinition {
    stepIndex: number;
    items: StepItem[];
    clone(): ManualStepDefinition;
  }

  type ProtectMethod = 'Forbidden' | 'Redirect' | 'WaterMark';

  interface WatermarkSetting {
    text: string;
    opacity: number;
    fontSize: number;
    position: string;
    color: string;
  }

  interface ButtonText {
    allowAll: string;
    allowSelection: string;
    rejectAll: string;
  }

  interface LinkText {
    privacyPolicy: LinkObject;
    cookiePolicy: LinkObject;
    settings: LinkObject;
  }

  interface CustomTheme {
  }

  interface CookieDescription {
    name: string;
    description: Record<string, string>;
    expireMinutes: number;
  }

  interface Binding extends Kooboo.Data.IGolbalObject {
    id: any;
    organizationId: any;
    subDomain: string;
    domainId: any;
    fullName: string;
    device: string;
    ipAddress: string;
    port: number;
    defaultPortBinding: boolean;
  }

  interface ParameterBinding {
    binding: string;
    fullTypeName: string;
    displayName: string;
    isCollection: boolean;
    isDictionary: boolean;
    isClass: boolean;
    controlType: string;
    isContentFolder: boolean;
    isProductType: boolean;
    isData: boolean;
    isOrderBy: boolean;
    isContentFilter: boolean;
    keyType: string;
    valueType: string;
    isJsonBinding: boolean;
  }

  interface StepItem {
    type: StepItemType;
    nodeId: number;
  }

  interface LinkObject {
    url: string;
    anchorText: string;
  }

}
declare namespace Kooboo.Data.ViewModel {
  interface RenewInfo {
    balance: number;
    currency: string;
    membership: MembershipInfo;
    domains: Domain[];
  }

  interface DataCenterViewModel {
    name: string;
    description: string;
    enable: boolean;
    default: boolean;
    primaryDomain: string;
    navUrl: string;
    baseUrl: string;
  }

  interface MembershipInfo {
    id: any;
    name: string;
    serverLevel: number;
    expiredIn?: Date;
  }

  interface Domain {
    id: any;
    name: string;
    expiredIn?: Date;
  }

  interface CommunityViewModel {
    id: any;
    type: string;
    title: string;
    userName: string;
    description: string;
    ranking: number;
    creationDate: Date;
    downloadCount: number;
    thumbNailExtension: string;
    price: number;
    thunbnailUrl: string;
    thumbNailUrl: string;
    downloadUrl: string;
  }

  interface CRMCustomer {
    id: string;
    kRef: string;
    username: string;
    email: string;
    registerDate: Date;
    registerIP: string;
    lastModified: Date;
  }

  interface CRMOrder {
    id: string;
    userId: string;
    /** enum: domain, membership,bandwidth, service, server, topup, apiMarketUsage, AppMarket, domainRenew */
    type: string;
    amount: number;
    creationDate: Date;
    lastModified: Date;
    paid: boolean;
  }

  interface DepartmentUser extends Kooboo.Data.IGolbalObject, Kooboo.Data.Models.User {
    departmentId: any;
    isManager: boolean;
    function: string;
    id: any;
    currentOrgId: any;
    currentOrgName: string;
    isAdmin: boolean;
    userName: string;
    emailAddress: string;
    emailId: any;
    isEmailVerified: boolean;
    isTelVerified: boolean;
    tel: string;
    twoFAMethod: string;
    otpSecret: string;
    password: string;
    passwordHash: any;
    firstName: string;
    lastName: string;
    fullName: string;
    language: string;
    registerIp: string;
    kRef: string;
    tempRedirectUrl: string;
    oneTimeToken: string;
    currency: string;
    registrationDate: Date;
    lastModified: Date;
    role: string;
    throwIfNotAdmin(): void;
    getPasswordString(): string;
    clone(): Kooboo.Data.Models.User;
  }

}
declare namespace KScript.Account {
  interface KMembership {
    addMembership(nameOrId: string, level: number, endDate: Date): void;
  }

  interface KSubscription {
    subscribe(request: Kooboo.Data.Models.SubscriptionRequest, isStaging?: boolean): Kooboo.Data.Models.Subscription;
    list(): Kooboo.Data.Models.Subscription[];
    get(id: string): Kooboo.Data.Models.Subscription;
    checkStatus(id: string): Kooboo.Data.Models.Subscription;
    cancel(id: string): Kooboo.Data.Models.Subscription;
  }

  interface KServer {
    list(): Kooboo.Data.Models.OrgServerHost[];
    sites(remoteUrl: string): Kooboo.Sites.ViewModel.SimpleSiteItemViewModel[];
    /** 
var serverUrl='https://www.kooboo.cn';
k.account.server.createSite('testsite','testsite.kooboo.cn',serverUrl);
 */
    createSite(siteName: string, fullDomain: string, serverUrl: string): Kooboo.Data.Models.WebSite;
  }

}
declare namespace Kooboo.Sites.OAuth2 {
  interface kOAuth extends Kooboo.Data.Interface.IkScript {
    builtIn: OAuthSystem;
    weChat: Kooboo.Sites.OAuth2.WeChat.WeChatLogin;
    weibo: Kooboo.Sites.OAuth2.Weibo.WeiboLogin;
    google: Kooboo.Sites.OAuth2.Google.GoogleLogin;
    apple: Kooboo.Sites.OAuth2.Apple.AppleLogin;
    facebook: Kooboo.Sites.OAuth2.Google.FacebookLogin;
    activeDirectory: Kooboo.Sites.OAuth2.ActiveDirectory.ActiveDirectoryHelper;
  }

  interface OAuthSystem {
    /** Implement Google OAuth login. */
    google: Kooboo.Sites.OAuth2.BuiltIn.BuiltInRedirect;
    facebook: Kooboo.Sites.OAuth2.BuiltIn.BuiltInRedirect;
    github: Kooboo.Sites.OAuth2.BuiltIn.BuiltInRedirect;
    wechat: Kooboo.Sites.OAuth2.BuiltIn.BuiltInRedirect;
    /** 
* Implement OAuth login using system builtin accounts. 
var url = k.oAuth2.builtIn.getAuthUrl("Google", "/ siteCallbackUrl"); 
k.response.redirect(url);
 */
    getAuthUrl(ProviderName: string, redirectUri: string): string;
    /** 
*Get OAuth login return user information. In the call back page. 
 var user = k.oAuth2.builtIn.getUserInfo(); 
 */
    getUserInfo(): any;
    /** 
*Get the list of implemented OAuth providers; 
 */
    providers(): string[];
  }

  interface IOAuth2 {
    getAuthUrl(params: any): string;
  }

}
declare namespace KScript.Payment.Model {
  interface UserCreditCard {
    chargeNewCard(model: ChargeNewCardModel, isStaging?: boolean): Kooboo.Data.Models.CreditCard.CreditCardPaymentResult;
    charge(model: ChargeModel, isStaging?: boolean): Kooboo.Data.Models.CreditCard.CreditCardPaymentResult;
    list(isStaging?: boolean): Kooboo.Data.Models.Market.CCPaymentMethod[];
    delete(paymentMethodId: string, isStaging?: boolean): void;
    checkStatus(paymentIntentId: string, isStaging?: boolean): boolean;
  }

  interface Ideal {
    charge(model: Kooboo.Data.Models.Ideal.IdealPaymentRequest, isStaging?: boolean): Kooboo.Data.Models.Ideal.IdealPaymentResult;
    checkStatus(paymentIntentId: string, isStaging?: boolean): boolean;
  }

  interface WeChatPay {
    /** ```
var result= k.account.weChatPay.charge({
    amount: 0.01,
    name: "a cup tea",
    orderId: "3d558dd8c38b4192b9b98a2f05bffa10"
})

//render QR Code from result
``` */
    charge(model: WeChatChargeModel): string;
    /** ```
var result= k.account.weChatPay.chargeH5({
    amount: 0.01,
    name: "a cup tea",
    orderId: "3d558dd8c38b4192b9b98a2f05bffa10",
    redirectUrl:"https://www.kooboo.com?orderid=xxxx"
})
k.response.redirect(result)
``` */
    chargeH5(model: WeChatH5ChargeModel): string;
    /** var result = k.account.weChatPay.checkStatus("3d558dd8c38b4192b9b98a2f05bffa10");
//true paid
//false unpaid */
    checkStatus(orderId: string): boolean;
  }

  interface ChargeNewCardModel {
    /** Name on card */
    name: string;
    /** Credit card number */
    number: string;
    /** e.g. 2024 */
    expYear: string;
    /** e.g. 04 */
    expMonth: string;
    /** e.g. 1234 */
    cvc: string;
    /** e.g. https://www.kooboo.com/payment_callback */
    returnUrl: string;
    /** e.g. 10.5 */
    amount: number;
    /** e.g. USD */
    currency: string;
  }

  interface ChargeModel {
    paymentMethodId: string;
    /** e.g. https://www.kooboo.com/payment_callback */
    returnUrl: string;
    /** e.g. 10.5 */
    amount: number;
    /** e.g. USD */
    currency: string;
  }

  interface WeChatChargeModel {
    orderId: string;
    /** e.g. 10.5 */
    amount: number;
    /** A cup tee */
    name: string;
  }

  interface WeChatH5ChargeModel extends WeChatChargeModel {
    redirectUrl: string;
    orderId: string;
    /** e.g. 10.5 */
    amount: number;
    /** A cup tee */
    name: string;
  }

  interface ChargeParams {
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface WeChatJsApiChargeParams extends ChargeParams {
    /** WeChat user OpenID */
    openId: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

}
declare namespace Kooboo.Sites.Store {
  interface TemplateItemViewModel {
    id: any;
    userName: string;
    thumbNail: string;
    name: string;
    seoName: string;
    category: string;
    size: number;
    ranking: number;
    sizeString: string;
    description: string;
    typeName: string;
    type: Kooboo.Sites.Store.Model.NameValue;
    theme: Kooboo.Sites.Store.Model.NameValue;
    tags: string;
    lastModified: Date;
    downloadCount: number;
    pageCount: number;
    contentCount: number;
    imageCount: number;
    layoutCount: number;
    menuCount: number;
    viewCount: number;
    thunbnailUrl: string;
    screenShotUrl: string;
    previewUrl: string;
    downloadUrl: string;
    thumbNailFileName: string;
    screenShotFileName: string;
    isPublic: boolean;
    state: string;
    source: string;
    color: string;
    searchText: string;
    price: number;
    currency: string;
    fromTemplateModel(model: Kooboo.Sites.Store.Model.TemplateModel, IsChinese: boolean): TemplateItemViewModel;
  }

}
declare namespace Kooboo.Sites.Scripting.ScriptModel {
  interface TemplatePagedData {
    list: Kooboo.Sites.Store.TemplateItemViewModel[];
    totalCount: number;
    pageNr: number;
    pageSize: number;
    totalPages: number;
  }

  interface SiteSummaryViewModel {
    siteId: string;
    siteName: string;
    siteDisplayName: string;
    pageCount: number;
    imageCount: number;
    homePageLink: string;
    type: string;
    folder: string;
    online: boolean;
  }

}
declare namespace Kooboo.Sites.Store.Model {
  interface TemplateEditViewModel {
    id: any;
    typeName: string;
    color: string;
    name: string;
    userName: string;
    description: string;
    tags: string;
    price: number;
    currency: string;
    isPublic: boolean;
    zHName: string;
    thumbnailUrl: string;
    screenShotUrl: string;
    zHThumbnailUrl: string;
    zHScreenShotUrl: string;
    previewUrl: string;
    fromTemplateModel(model: TemplateModel): TemplateEditViewModel;
  }

  interface TemplateModel {
    id: any;
    typeName: string;
    color: string;
    name: string;
    userName: string;
    description: string;
    tags: string;
    price: number;
    ranking: number;
    currency: string;
    lastModified: Date;
    resourceCount: string;
    size: number;
    isApproved: boolean;
    downloadCount: number;
    isPublic: boolean;
    zHName: string;
    isUpdate: boolean;
    updatePackageId: any;
    updateScreenOnly: boolean;
    updateBinaryOnly: boolean;
    category: string;
    source: string;
    state: string;
  }

  interface NameValue {
    name: string;
    value: number;
  }

}
declare namespace Kooboo.Data.Cache {
  interface Options {
    absoluteExpiration?: any;
    slidingExpiration?: any;
    cascades: Cascade[];
  }

  interface MemoryCacheBase {
    group: string;
    set(key: string, value: any, options: Options): void;
    get(key: string): any;
    getOrCreate(key: string, factory: any, options?: Options): any;
    remove(key: string): void;
  }

  interface Cascade {
    key: string;
    removeChangeToken: boolean;
  }

}
declare namespace Kooboo.Sites.Sync {
  type CopyMode = 'Normal' | 'Fast';

  interface SiteSync {
    getObjLastVersion(SyncSettingId: any, ObjectId: any): number;
    ignoreLog(SyncSettingId: any, LogId: number): void;
    unIgnore(SyncSettingId: any, ObjectId: any): void;
    listIgnoreObj(SyncSettingId: any): IgnoreObject[];
    getRemoteBackVersion(SyncSettingId: any, ObjectId: any): number;
    addOut(SyncSettingId: any, StoreName: string, TableName: string, ObjectId: any, localVersion: number, RemoteVersion: number, UserId: any): void;
    addIn(SyncSettingId: any, StoreName: string, TableName: string, ObjectId: any, localVersion: number, RemoteVersion: number, userId: any): void;
    getRemoteVersion(syncSettingId: any): number;
    setLastReadVersion(SyncSettingId: any, Version: number): void;
    getLastReadVersion(SyncSettingId: any): number;
    setOutProgress(SyncSettingId: any, Version: number): void;
    getOutProgress(SyncSettingId: any): number;
    pushItems(setting: Kooboo.Sites.Models.SyncSetting, call: Kooboo.Api.ApiCall, take?: number): Kooboo.IndexedDB.LogEntry[];
    pushItemsCount(setting: Kooboo.Sites.Models.SyncSetting, call: Kooboo.Api.ApiCall): number;
    getOutRecords(SettingId: any, PageSize: number, PageNr: number, call?: Kooboo.Api.ApiCall): any;
    getInRecords(SettingId: any, PageSize: number, PageNr: number, call?: Kooboo.Api.ApiCall): any;
    scanFacet(SettingId: any, source: FacetSource, call: Kooboo.Api.ApiCall): LogFacet;
  }

  interface IgnoreObject extends Kooboo.IndexedDB.BPlusTree.IBPlusTreeObject {
    objectId: any;
    constObjectType: number;
    lastModified: Date;
    logId: number;
    isTable: boolean;
    bPlusTreeLen: number;
    skipValueBlock: boolean;
    getObjectId(BPlusBytes: number[]): any;
    getLogId(BPlusBytes: number[]): number;
    getBPlusBytes(): number[];
    setBPlusBytes(bytes: number[]): void;
  }

  type FacetSource = 'PushQueue' | 'PullIn' | 'PushOut' | 'Ignore';

  interface LogFacet {
    storeNames: string[];
    userIds: any[];
  }

  interface SyncObject {
    objectId: any;
    isDelete: boolean;
    objectConstType: number;
    jsonData: string;
    language: string;
    storeName: string;
    tableName: string;
    tableColName: string;
    isTable: boolean;
    sender: number;
    senderTick: number;
    senderVersion: number;
    senderIdentifier: any;
    remoteLastVersion: number;
    remoteSiteId: any;
    userId: any;
    editType: Kooboo.IndexedDB.EditType;
  }

}
declare namespace KScript.Sites {
  interface PageRepository extends RoutableTextRepository {
    /** ```ts
// get the SiteObject by Url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var style = k.site.styles.getByUrl("/style.css");
```
 */
    getByUrl(url: string): Kooboo.Sites.Models.Page;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.Page;
    getUrls(nameOrId: string): any;
    updateRoute(id: string, url: string, culture?: string): void;
    /** ```ts
// Add a routable SiteObject, SiteObject can be page, style or others. 
var page = {};
page.name = "pagename";
page.body = "new  body";
page.url = "/myurl"
k.site.pages.add(page);
```
 */
    add(RoutableText: Kooboo.Sites.Models.Page): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.Page[];
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.Page): void;
    getByLog(LogId: number): Kooboo.Sites.Models.Page;
    /** ```ts
// get the SiteObject relative url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var url = k.site.pages.getUrl(page.id);
```
 */
    getUrl(id: any): string;
    /** ```ts
// get the absolute Url of this object
var page = k.site.pages.getByUrl("/ pagename");
var url = k.site.pages.getAbsUrl(page.id);
```
 */
    getAbsUrl(id: any): string;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface ViewRepository extends TextRepository {
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: Kooboo.Sites.Models.View): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.View[];
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.View;
    getByLog(LogId: number): Kooboo.Sites.Models.View;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.View): void;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface LayoutRepository extends TextRepository {
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: Kooboo.Sites.Models.Layout): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.Layout[];
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.Layout;
    getByLog(LogId: number): Kooboo.Sites.Models.Layout;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.Layout): void;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface HtmlBlockRepository extends MultilingualRepository {
    add(SiteObject: Kooboo.Sites.Contents.Models.HtmlBlock): void;
    all(): Kooboo.Sites.Contents.Models.HtmlBlock[];
    /** Return object with multilingual content, to get the text value, use GetValue method */
    get(nameOrId: any): Kooboo.Sites.Contents.Models.HtmlBlock;
    update(SiteObject: Kooboo.Sites.Contents.Models.HtmlBlock): void;
    /** Try to get the item, if not found, insert one with default value. */
    getOrAdd(nameOrId: any, DefaultValue: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    /** Return text value of current object by current culture */
    getValue(nameOrId: any): string;
    /** Return text value of current object by current culture */
    getValue(nameOrId: any, params: any): string;
    delete(nameOrId: any): void;
    /** Add an item with default culture */
    add(name: string, value: string): void;
    add(name: string, value: string, culture: string): void;
    update(name: string, value: string): void;
    update(name: string, value: string, culture: string): void;
  }

  interface LabelRepository extends MultilingualRepository {
    delete(nameOrId: any): void;
    add(SiteObject: Kooboo.Sites.Contents.Models.Label): void;
    all(): Kooboo.Sites.Contents.Models.Label[];
    /** Return object with multilingual content, to get the text value, use GetValue method */
    get(nameOrId: any): Kooboo.Sites.Contents.Models.Label;
    /** Try to get the item, if not found, insert one with default value. */
    getOrAdd(nameOrId: any, DefaultValue: string): Kooboo.Sites.Contents.Models.Label;
    update(SiteObject: Kooboo.Sites.Contents.Models.Label): void;
    /** Return text value of current object by current culture */
    getValue(nameOrId: any): string;
    /** Return text value of current object by current culture */
    getValue(nameOrId: any, params: any): string;
    /** Add an item with default culture */
    add(name: string, value: string): void;
    add(name: string, value: string, culture: string): void;
    update(name: string, value: string): void;
    update(name: string, value: string, culture: string): void;
  }

  interface ScriptRepository extends RoutableTextRepository {
    /** ```ts
// Add a routable SiteObject, SiteObject can be page, style or others. 
var page = {};
page.name = "pagename";
page.body = "new  body";
page.url = "/myurl"
k.site.pages.add(page);
```
 */
    add(RoutableText: Kooboo.Sites.Models.Script): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.Script[];
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.Script;
    getByLog(LogId: number): Kooboo.Sites.Models.Script;
    /** ```ts
// get the SiteObject by Url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var style = k.site.styles.getByUrl("/style.css");
```
 */
    getByUrl(url: string): Kooboo.Sites.Models.Script;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.Script): void;
    /** ```ts
// get the SiteObject relative url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var url = k.site.pages.getUrl(page.id);
```
 */
    getUrl(id: any): string;
    /** ```ts
// get the absolute Url of this object
var page = k.site.pages.getByUrl("/ pagename");
var url = k.site.pages.getAbsUrl(page.id);
```
 */
    getAbsUrl(id: any): string;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface CodeRepository extends RoutableTextRepository {
    /** ```ts
// Add a routable SiteObject, SiteObject can be page, style or others. 
  var page = {};
  page.name = "pagename";
  page.body = "new  body";
  page.url = "/myurl"
  k.site.pages.add(page);
```
 */
    add(RoutableText: Code): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Code[];
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Code;
    getByLog(LogId: number): Code;
    /** ```ts
// get the SiteObject by Url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var style = k.site.styles.getByUrl("/style.css");
```
 */
    getByUrl(url: string): Code;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Code): void;
    /** ```ts
// get the SiteObject relative url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var url = k.site.pages.getUrl(page.id);
```
 */
    getUrl(id: any): string;
    /** ```ts
// get the absolute Url of this object
var page = k.site.pages.getByUrl("/ pagename");
var url = k.site.pages.getAbsUrl(page.id);
```
 */
    getAbsUrl(id: any): string;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface StyleRepository extends RoutableTextRepository {
    /** ```ts
// Add a routable SiteObject, SiteObject can be page, style or others. 
var page = {};
page.name = "pagename";
page.body = "new  body";
page.url = "/myurl"
k.site.pages.add(page);
```
 */
    add(RoutableText: Kooboo.Sites.Models.Style): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.Style[];
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.Style;
    getByLog(LogId: number): Kooboo.Sites.Models.Style;
    /** ```ts
// get the SiteObject by Url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var style = k.site.styles.getByUrl("/style.css");
```
 */
    getByUrl(url: string): Kooboo.Sites.Models.Style;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.Style): void;
    /** ```ts
// get the SiteObject relative url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var url = k.site.pages.getUrl(page.id);
```
 */
    getUrl(id: any): string;
    /** ```ts
// get the absolute Url of this object
var page = k.site.pages.getByUrl("/ pagename");
var url = k.site.pages.getAbsUrl(page.id);
```
 */
    getAbsUrl(id: any): string;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface ImageRepository extends BinaryRepository {
    addImage(path: string, data: number[], alt?: string): Kooboo.Sites.Storage.MediaStorageFileModel;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.Image[];
    /** ```ts
// list the Binary Objects under folder
const image = k.site.images.getByFolder("/images");
```
 */
    getByFolder(folder: string): Kooboo.Sites.Models.Image[];
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: Kooboo.Sites.Models.Image): void;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.Image;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.Image): void;
    getByLog(LogId: number): Kooboo.Sites.Models.Image;
    /** ```ts
// get the Binary Object by Url
const image = k.site.images.getByUrl("/kooboo.png");
```
 */
    getByUrl(url: string): Kooboo.Sites.Models.Image;
    /** ```ts
// Update the binary content
 if (k.request.files.length>0)
{
        var image = k.site.images.getByUrl("/kooboo.png");
        k.site.images.updateBinary(image.id, k.request.files[0].bytes); 
}
```
 */
    updateBinary(NameOrId: any, Binary: number[]): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface FileRepository extends BinaryRepository {
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: Kooboo.Sites.Models.CmsFile): void;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.CmsFile[];
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Sites.Models.CmsFile;
    getByLog(LogId: number): Kooboo.Sites.Models.CmsFile;
    /** ```ts
// list the Binary Objects under folder
const image = k.site.images.getByFolder("/images");
```
 */
    getByFolder(folder: string): Kooboo.Sites.Models.CmsFile[];
    /** ```ts
// get the Binary Object by Url
const image = k.site.images.getByUrl("/kooboo.png");
```
 */
    getByUrl(url: string): Kooboo.Sites.Models.CmsFile;
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: Kooboo.Sites.Models.CmsFile): void;
    /** ```ts
// Update the binary content
 if (k.request.files.length>0)
{
        var image = k.site.images.getByUrl("/kooboo.png");
        k.site.images.updateBinary(image.id, k.request.files[0].bytes); 
}
```
 */
    updateBinary(NameOrId: any, Binary: number[]): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
  }

  interface RouteObjectRepository {
    getByNameOrId(NameOrId: string): Kooboo.Sites.Routing.Route;
    getByUrl(Url: string): Kooboo.Sites.Routing.Route;
    getByObjectId(objectId: any): Kooboo.Sites.Routing.Route;
    changeRoute(oldurl: string, newurl: string): void;
    all(): Kooboo.Sites.Routing.Route[];
    makeAlias(url: string, alias: string): Kooboo.Sites.Routing.Route;
  }

  interface FormValuesRepository extends RepositoryBase {
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.SiteObject[];
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: any): void;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Data.Interface.ISiteObject;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
    getByLog(LogId: number): Kooboo.Data.Interface.ISiteObject;
  }

  interface UserModel {
    userName: string;
    firstName: string;
    lastName: string;
    language: string;
  }

  interface RoutableTextRepository extends TextRepository {
    /** ```ts
// get the SiteObject by Url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var style = k.site.styles.getByUrl("/style.css");
```
 */
    getByUrl(url: string): Kooboo.Data.Interface.ITextObject;
    /** ```ts
// Add a routable SiteObject, SiteObject can be page, style or others. 
var page = {};
page.name = "pagename";
page.body = "new  body";
page.url = "/myurl"
k.site.pages.add(page);
```
 */
    add(RoutableText: KScript.Parameter.RoutableText): void;
    /** ```ts
// get the SiteObject relative url, SiteObject can be page, style or others.
var page = k.site.pages.getByUrl("/pagename");
var url = k.site.pages.getUrl(page.id);
```
 */
    getUrl(id: any): string;
    /** ```ts
// get the absolute Url of this object
var page = k.site.pages.getByUrl("/ pagename");
var url = k.site.pages.getAbsUrl(page.id);
```
 */
    getAbsUrl(id: any): string;
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Data.Interface.ITextObject;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.SiteObject[];
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: any): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
    getByLog(LogId: number): Kooboo.Data.Interface.ISiteObject;
  }

  interface TextRepository extends RepositoryBase {
    /** ```ts
// Update text value of the body property
var style = k.site.styles.getByUrl("/a.css"); 
k.site.styles.updateBody(style.Id, ".newcls{}");
```
 */
    updateBody(NameOrId: any, newbody: string): void;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Data.Interface.ITextObject;
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.SiteObject[];
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: any): void;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
    getByLog(LogId: number): Kooboo.Data.Interface.ISiteObject;
  }

  interface MultilingualRepository {
    all(): MultilingualObject[];
    /** Return object with multilingual content, to get the text value, use GetValue method */
    get(nameOrId: any): MultilingualObject;
    /** Return text value of current object by current culture */
    getValue(nameOrId: any): string;
    /** Return text value of current object by current culture */
    getValue(nameOrId: any, params: any): string;
    delete(nameOrId: any): void;
    /** Try to get the item, if not found, insert one with default value. */
    getOrAdd(nameOrId: any, DefaultValue: string): MultilingualObject;
    /** Add an item with default culture */
    add(name: string, value: string): void;
    add(name: string, value: string, culture: string): void;
    update(name: string, value: string): void;
    update(name: string, value: string, culture: string): void;
    update(SiteObject: any): void;
  }

  interface Code extends KScript.Parameter.RoutableText {
    codeType: Kooboo.Sites.Models.CodeType;
    scriptType: Kooboo.Data.ScriptType;
  }

  interface BinaryRepository extends RepositoryBase {
    /** ```ts
// Update the binary content
 if (k.request.files.length>0)
{
        var image = k.site.images.getByUrl("/kooboo.png");
        k.site.images.updateBinary(image.id, k.request.files[0].bytes); 
}
```
 */
    updateBinary(NameOrId: any, Binary: number[]): void;
    /** ```ts
// get the Binary Object by Url
const image = k.site.images.getByUrl("/kooboo.png");
```
 */
    getByUrl(url: string): Kooboo.Sites.Scripting.Global.SiteItem.TypeDefinition.BinaryObject;
    /** ```ts
// list the Binary Objects under folder
const image = k.site.images.getByFolder("/images");
```
 */
    getByFolder(folder: string): Kooboo.Sites.Scripting.Global.SiteItem.TypeDefinition.BinaryObject[];
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.SiteObject[];
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: any): void;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Data.Interface.ISiteObject;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
    getByLog(LogId: number): Kooboo.Data.Interface.ISiteObject;
  }

  interface RepositoryBase {
    /** ```ts
// Return an array of all SiteObjects. SiteObject can be view, layout, style or others.
var allStyles = k.site.styles.all();
```
 */
    all(): Kooboo.Sites.Models.SiteObject[];
    /** ```ts
// Update the SiteOject property values. SiteObject can be view, layout, style or others. 
var style = k.site.styles.getByUrl("/a.css"); 
style.body = ".sample {}"; 
k.site.styles.update(style);
```
 */
    update(SiteObject: any): void;
    /** ```ts
// Get an SiteObject based on Name or Id. SiteObject can be view, layout, style or others. 
var view = k.site.views.get("viewname");
```
 */
    get(nameOrId: any): Kooboo.Data.Interface.ISiteObject;
    /** ```ts
// Delete a SiteObject, SiteObject can be view, layout, page or others.
var page = k.site.pages.getByUrl("/pagename"); 
k.site.pages.delete(page.id);
```
 */
    delete(nameOrId: any): void;
    /** ```ts
// Add a siteobject, a siteobject can be view, layout, page or others. 
var view = {};
view.name = "viewname";
view.body = "new body"; 
k.site.views.add(view);
```
 */
    add(SiteObject: any): void;
    getLogs(NameOrId: any): Kooboo.Sites.Scripting.ChangeLog[];
    getByLog(LogId: number): Kooboo.Data.Interface.ISiteObject;
  }

  interface MultilingualObject extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IDynamic, Kooboo.Sites.Contents.Models.MultipleLanguageObject {
    keys: string[];
    length: number;
    values: Record<string, any>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    /** Set the value with culture of current context */
    setValue(value: string): void;
    /** Set the value with the target culture */
    setCultureValue(culture: string, value: string): void;
    /** Get the value of current culture */
    getValue(): string;
    /** Get the value of target culture */
    getCultureValue(culture: string): string;
    clone(): any;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.SiteItem {
  interface SiteHelper {
    siteUrl(): string;
    pagePreviewUrl(PageId: any): string;
    pageInlineEditUrl(PageId: any): string;
  }

  interface KEditLog {
    lastLog(skip: number, takeCount: number): LastEdit[];
    lastLog(pageIndex: number, pagesize: number, siteUrl: string): RemoteLastLogResult;
    videoLog(versionId: number): string;
    videoLog(versionId: number, siteUrl: string): string;
    versions(keyHash: string, storeNameHash: number, tableNameHash: number, siteUrl: string): ItemVersionViewModel[];
    compare(id1: number, id2: number, siteUrl: string): VersionCompareViewModel;
    getAgo(LastModifyTick: number): string;
  }

  interface Visitor {
    top(count: number): Kooboo.Data.Models.VisitorLog[];
    top500(): Kooboo.Data.Models.VisitorLog[];
    /** Top visitor source based on last 30 days visitors */
    topSource(): VisitorSource[];
    top5Pages(): Kooboo.Sites.Service.ResourceCount[];
    thisWeek(count: number): Kooboo.Data.Models.VisitorLog[];
    /** WeekName in the format of year + week number, for example: 2020-12 */
    byWeek(weekName: string, count: number): Kooboo.Data.Models.VisitorLog[];
    weeks(): string[];
    errorList(options?: ErrorListOptions): any;
  }

  interface DiskSpace {
    getSiteSize(): Kooboo.Sites.ViewModel.DiskSize;
    getCommonStoreSize(): TopSize;
  }

  interface LastEdit {
    logId: number;
    ago: string;
    lastModify: Date;
    updateTick: number;
    storeName: string;
    displayName: string;
    userName: string;
    actionType: string;
  }

  interface RemoteLastLogResult {
    list: SiteLogViewModel[];
    totalCount: number;
    pageNr: number;
    pageSize: number;
    totalPages: number;
  }

  interface ItemVersionViewModel {
    id: number;
    lastModified: Date;
    userName: string;
    hasVideo: boolean;
  }

  interface VisitorSource {
    source: string;
    counter: number;
  }

  interface ErrorListOptions {
    weekName: string;
    pageIndex?: number;
    pageSize?: number;
  }

  interface TopSize {
    storeItem: StoreItem[];
    visitorLogSize: string;
    totalSize: string;
    total: number;
  }

  interface SiteLogViewModel {
    id: number;
    lastModified: Date;
    userName: string;
    itemName: string;
    storeName: string;
    keyHash: any;
    storeNameHash: number;
    tableNameHash: number;
    tableName: string;
    actionType: string;
    hasVideo: boolean;
  }

  interface StoreItem {
    name: string;
    itemCount: number;
    size: number;
    sizeString: string;
  }

}
declare namespace KScript.SiteUser {
  interface KSiteUser {
    addUser(user: SiteUser): boolean;
    addUser(user: SiteUser, siteUrl: string): void;
  }

  interface SiteUser {
    nameOrId: string;
    role: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Site {
  interface kCoreSettings {
    item: any;
    /** ```ts
// Get site setting use name
const setting = k.site.settings.get('mongo') // or k.site.settings.mongo
// return object or null
```
 */
    get(name: string): any;
  }

}
declare namespace K.DashBoard {
  interface KDashBoard {
    createCard(): Card;
    createDialog(): Dialog;
    createBarChart(): BarRow;
    createPieChart(): PieRow;
    createLineChart(): LineRow;
    createRadarChart(): RadarRow;
    createTable(): TableRow;
    createButton(text: string): ButtonRow;
  }

  interface Card extends Item {
    autoRefresh: boolean;
    refreshIntervalSeconds: number;
    rows: IDashBoardRow[];
    addRow(row: IDashBoardRow): Item;
    addTextRow(text: string, options?: TextOptions): Item;
    addHTMLRow(html: string): Item;
    addButtonRow(text: string): Item;
  }

  interface Dialog extends Item {
    rows: IDashBoardRow[];
    addRow(row: IDashBoardRow): Item;
    addTextRow(text: string, options?: TextOptions): Item;
    addHTMLRow(html: string): Item;
    addButtonRow(text: string): Item;
  }

  interface BarRow extends IDashBoardRow, ChartRow {
    addLabel(label: string): BarRow;
    addBar(value: number, options?: BarOptions): BarRow;
  }

  interface PieRow extends IDashBoardRow, ChartRow {
    addItem(label: string, value: number, options?: ItemOptions): PieRow;
  }

  interface LineRow extends IDashBoardRow, ChartRow {
    addLabel(label: string): LineRow;
    addLine(name: string, points: number[], options?: LineOptions): LineRow;
  }

  interface RadarRow extends IDashBoardRow, ChartRow {
    addLabel(label: string): RadarRow;
    addMap(name: string, points: number[], options?: MapOptions): RadarRow;
  }

  interface TableRow extends IDashBoardRow {
    addHeader(header: string): TableRow;
    addRow(cells: string[]): TableRow;
  }

  interface ButtonRow extends IDashBoardRow {
    clickOpenDialog(name: string, action: any): ButtonRow;
    clickOpenUrl(url: string): ButtonRow;
    clickRedirect(url: string): ButtonRow;
  }

  interface IDashBoardRow {
  }

  interface Item {
    rows: IDashBoardRow[];
    addRow(row: IDashBoardRow): Item;
    addTextRow(text: string, options?: TextOptions): Item;
    addHTMLRow(html: string): Item;
    addButtonRow(text: string): Item;
  }

  interface TextOptions {
    align: Align;
    fontSize: number;
  }

  interface BarOptions {
    backgroundColor: string;
    borderColor: string;
    category: string;
  }

  interface ChartRow extends IDashBoardRow {
  }

  interface ItemOptions {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }

  interface LineOptions {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }

  interface MapOptions {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }

  type Align = 'Left' | 'Right' | 'Center';

}
declare namespace Kooboo.Sites.DataSources {
  interface Search extends Kooboo.Data.Interface.IDataSource, SiteDataSource {
    /** 
k.site.search.findAll('my keyword')
         */
    findAll(keyword: string, options?: Kooboo.Sites.Repository.SearchOptions): Kooboo.Sites.Repository.SearchResult[];
    on(folderName: string): KScript.KFullTextSearch;
  }

  interface SiteDataSource extends Kooboo.Data.Interface.IDataSource {
  }

}
declare namespace KScript.Files {
  interface SearchFolderOptions {
    includeAuthor?: boolean;
    includeAllDirectories?: boolean;
    /** Default value: *.* */
    searchPattern?: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.DB {
  interface KWormDb {
    openDb(Path: string, Name: string): SequenceDb;
    openDb(Path: string, Name: string, KeyFieldName: string): SequenceDb;
    openDb(Name: string): SequenceDb;
    deleteDb(Path: string, Name: string): void;
    deleteDb(Name: string): void;
    validPath(part: string): boolean;
  }

  interface SequenceDb {
    context: Kooboo.Data.Context.RenderContext;
    lastKey: number;
    firstKey: number;
    /** Add one item and return the inserted key */
    add(obj: any): number;
    get(Id: number): any;
    /** Insert with a predefined key, key value must be incremental long value */
    add(key: number, obj: any): number;
    range(lowBound: number, highBound: number, Ascending: boolean): Record<string, any>[];
    delete(key: number): void;
    update(key: number, obj: any): void;
    count(lowBound: number, highBound: number): number;
    find(js: Function): any;
    find(js: Function, lowKey: number, highKey: number, Ascending?: boolean): Record<string, any>;
    findAll(js: Function, lowKey: number, highKey: number, Ascending?: boolean): Record<string, any>[];
    findAll(js: Function): Record<string, any>[];
    close(): void;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Mysql {
  interface MysqlDatabase extends Kooboo.Sites.Scripting.Interfaces.IRelationalDatabase, KScript.IDatabase {
    getTables(): string[];
    getTable(name: string): KScript.ITable;
    query(sql: string): KScript.IDynamicTableObject[];
    query<T>(sql: string): T;
    operators(): KScript.Operators;
    query(sql: string, param?: any): KScript.IDynamicTableObject[];
    query<T>(sql: string, param?: any): T;
    execute(sql: string): number;
    execute(sql: string, param?: any): number;
    get(sql: string, param?: any): KScript.IDynamicTableObject;
    get<T>(sql: string, param?: any): T;
    value(sql: string, param?: any): any;
    value<T>(sql: string, param?: any): T;
    /** Procedure define:
```sql
CREATE PROCEDURE [dbo].[abc] @p = 0,
AS
    SELECT @p
```

Invoke:
```ts
k.DB.datebase.procedure("abc")
```
Result:
```json
[ { "a": 0} ]
``` */
    procedure(sql: string): any;
    /** Procedure define:
```sql
CREATE PROCEDURE [dbo].[abc] @p1 int = 0, @p2 int
AS
    SELECT a=@p1, b=@p2
```

Invoke:
```ts
k.DB.datebase.procedure("abc",{
param2: 34
})
```

Result:
```json
[ { "a": 0, "b": 34 } ]
``` */
    procedure(sql: string, param?: any): any;
    transaction(action: Function): void;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.SqlServer {
  interface SqlServerDatabase extends Kooboo.Sites.Scripting.Interfaces.IRelationalDatabase, KScript.IDatabase {
    getTables(): string[];
    getTable(name: string): KScript.ITable;
    query(sql: string): KScript.IDynamicTableObject[];
    query<T>(sql: string): T;
    operators(): KScript.Operators;
    query(sql: string, param?: any): KScript.IDynamicTableObject[];
    query<T>(sql: string, param?: any): T;
    execute(sql: string): number;
    execute(sql: string, param?: any): number;
    get(sql: string, param?: any): KScript.IDynamicTableObject;
    get<T>(sql: string, param?: any): T;
    value(sql: string, param?: any): any;
    value<T>(sql: string, param?: any): T;
    /** Procedure define:
```sql
CREATE PROCEDURE [dbo].[abc] @p = 0,
AS
    SELECT @p
```

Invoke:
```ts
k.DB.datebase.procedure("abc")
```
Result:
```json
[ { "a": 0} ]
``` */
    procedure(sql: string): any;
    /** Procedure define:
```sql
CREATE PROCEDURE [dbo].[abc] @p1 int = 0, @p2 int
AS
    SELECT a=@p1, b=@p2
```

Invoke:
```ts
k.DB.datebase.procedure("abc",{
param2: 34
})
```

Result:
```json
[ { "a": 0, "b": 34 } ]
``` */
    procedure(sql: string, param?: any): any;
    transaction(action: Function): void;
  }

}
declare namespace Kooboo.Sites.Scripting.Interfaces {
  interface IRelationalDatabase extends KScript.IDatabase {
    query(sql: string): KScript.IDynamicTableObject[];
    query(sql: string, param?: any): KScript.IDynamicTableObject[];
    execute(sql: string): number;
    execute(sql: string, param?: any): number;
    procedure(sql: string): any;
    procedure(sql: string, param?: any): any;
  }

}
declare namespace Kooboo.Sites.Routing {
  interface Route extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.CoreObject {
    name: string;
    objectId: any;
    destinationConstType: number;
    culture: string;
    parameters: Record<string, string>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    copy(): Route;
    clone(): any;
  }

  interface PathTree {
    addOrUpdate(route: Route): void;
    addOrUpdate(RelativeUrl: string, RouteKey: any, ObjectId: any, ConstType: number, Parameters: Record<string, string>): void;
    del(RelativeUrl: string): void;
    findRouteId(RelativeUrl: string, EnsureObjectId: boolean): any;
    findPath(RelativeUrl: string, EnsureObjectId: boolean): Kooboo.Sites.Models.Path;
    hasObject(path: Kooboo.Sites.Models.Path): boolean;
  }

}
declare namespace KScript.Utils {
  interface KUri {
    parse(uri: string): KUriBuilder;
    setQueryParam(uri: string, name: string, value: string): string;
    getQueryParam(uri: string, name: string): string;
  }

  interface KCRM {
    getCustomers(startDate: Date, crmKey: string): Kooboo.Data.ViewModel.CRMCustomer[];
    getOrders(startDate: Date, crmKey: string): Kooboo.Data.ViewModel.CRMOrder[];
  }

  interface KUriBuilder {
    scheme: string;
    userName: string;
    password: string;
    host: string;
    port: number;
    path: string;
    query: string;
    setQueryParam(name: string, value: string): void;
    getQueryParam(name: string): string;
    /** Result: http://www.kooboo.con:80/?name=abc */
    toUri(): string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Community {
  interface KCommunity {
    context: Kooboo.Data.Context.RenderContext;
    shareBinary(type: string, title: string, description: string, FileBinary: number[], ThumbnailBinary: number[]): ShareResponse;
    share(type: string, Title: string, Description: string, BinaryBase64: string, ThumbnailBase64: string): ShareResponse;
    search(type: string): Kooboo.Data.ViewModel.CommunityViewModel[];
    search(type: string, keyword: string, skip: number, count: number): Kooboo.Data.ViewModel.CommunityViewModel[];
    downloadFile(packageUrl: string): number[];
    delete(Id: string): DeleteResponse;
  }

  interface ShareResponse {
    isSuccess: boolean;
    isTitleExists: boolean;
    isNotAuthorized: boolean;
    message: string;
    packageId: any;
  }

  interface DeleteResponse {
    isSuccess: boolean;
    isNotAuthorized: boolean;
    isPackageNotFound: boolean;
    message: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.WebUtility {
  interface KMime {
    getMimeMapping(fileName: string): string;
    getExtensions(mimeType: string): string[];
  }

  interface ScreenShot {
    context: Kooboo.Data.Context.RenderContext;
    /** Take screenshot of one url and return binary array. The Url must be accessible from internet because it is taken from remote.  */
    take(absoluteUrl: string): number[];
    /** Take screenshot of one url and return binary array. The Url must be accessible from internet because it is taken from remote.  */
    take(absoluteUrl: string, width: number, height: number): number[];
    /** Take screenshot of one url and return binary array. The Url must be accessible from internet because it is taken from remote.  */
    take(absoluteUrl: string, width: number, height: number, fullPage: boolean): number[];
    /** Take screenshot of one url and return binary array. The Url must be accessible from internet because it is taken from remote.  */
    take(absoluteUrl: string, width: number, height: number, scaleWidth: number, scaleHeight: number, fullPage: boolean): number[];
    /** Take screenshot of local url, that is not accessible from internet.  */
    takeLocalPageUrl(LocalPageRelitiveUrl: string, width: number, height: number, fullPage: boolean): number[];
    /** Take screenshot of local url, that is not accessible from internet.  */
    takeLocalPageUrl(LocalPageRelitiveUrl: string): number[];
    /** Take screenshot of local url, that is not accessible from internet.  */
    takePage(PageName: string, width: number, height: number, fullPage: boolean): number[];
    /** Take screenshot of local url, that is not accessible from internet.  */
    takePage(PageName: string): number[];
    /** Take screenshot from HTML code and return binary array. */
    takeFromHTML(HTMLCode: string, width: number, height: number, fullPage: boolean): number[];
    /** Take screenshot from HTML code and return binary array. */
    takeFromHTML(HTMLCode: string, width: number, height: number, scaleWidth: number, scaleHeight: number, fullPage: boolean): number[];
    /** Take screenshot from HTML code and return binary array. */
    takeFromHTML(HTMLCode: string): number[];
  }

  interface KInlineHTML {
    context: Kooboo.Data.Context.RenderContext;
    convertPageInline(PageName: string): string;
    convertPageUrlInline(PageRelativeUrl: string): string;
  }

  interface KImageUtility {
    changeFormat(Binary: number[], NewExtension: string): number[];
    changeDpi(file: KScript.UploadFile, targetDpi: number, saveAs: string): KScript.FileInfo;
    changeDpi(file: KScript.FileInfo, targetDpi: number, saveAs?: string): KScript.FileInfo;
    resize(file: KScript.FileInfo, height: number, width: number, saveAs?: string): KScript.FileInfo;
    resize(image: number[], height: number, width: number): number[];
    /** var image = k.file.readBinary("1.jpg");
var watermark = k.file.readBinary("2.png")
var output = k.utils.image.addWatermark(image, watermark, {
    align: "bottom",
    justify: "right",
    offsetX: 0.05,
    offsetY: 0.05,
    opacity: 0.8
})

k.file.writeBinary("output.jpg", output) */
    addWatermark(binary: number[], watermark: number[], option: WatermarkOptions): number[];
    getSize(Image: number[]): Kooboo.Lib.Utilities.SizeMeasurement;
    /** ```ts
const binary = k.file.readBinary("2.webp"); //support gif and webp
const count = k.utils.image.getFrameCount(binary);
```
 */
    getFrameCount(image: number[]): number;
    convertToTwoFramesGif(image: number[]): number[];
  }

  interface Google {
    lHRJson(AbsoluteUrl: string, MobileDevice: boolean): string;
    lHRUrl(AbsoluteUrl: string, MobileDevice: boolean): string;
    lHRUrlFromJson(json: string): string;
    parseJson(json: string): FullLHRObj;
    saveJson(json: string): any;
    shortLhrReportUrl(json: string): string;
    getJson(Id: any): string;
  }

  interface KTemplateEngine {
    context: Kooboo.Data.Context.RenderContext;
    render(view: string): string;
    renderPage(url: string): string;
  }

  interface Ninjible {
    createTask(url: string, rootDomain: string, OrgName: string): string;
    createImportTask(url: string, rootDomain: string): string;
    getStatus(taskId: string): NinjibleProgress;
  }

  interface CDNUtility {
    disableCDN(): void;
    enableCDN(): void;
    setCacheTime(minutes: number): void;
  }

  interface KPuppeteer {
    screenshot(url: string, savePath: string, options?: ScreenshotOptions): void;
  }

  interface WatermarkOptions {
    /** top,center,bottom */
    align: string;
    /** left,center,right */
    justify: string;
    opacity: number;
    offsetX: number;
    offsetY: number;
    repeat: boolean;
  }

  interface FullLHRObj {
    lighthouseResult: lighthouseResult;
    getSummary(): ReportSummary;
  }

  interface NinjibleProgress {
    isDone: boolean;
    percent: number;
    oldUrl: string;
    oldReportUrl: string;
    devPass: string;
    newUrl: string;
    newReportUrl: string;
    oldSiteScore: LightHouseScore;
    newSiteScore: LightHouseScore;
  }

  interface ScreenshotOptions {
    delaySeconds: number;
    width: number;
    height: number;
    fullPage: boolean;
  }

  interface ReportSummary {
    performance: number;
    accessibility: number;
    bestpractices: number;
    seo: number;
    pwa: number;
  }

  interface lighthouseResult {
    categories: categories;
  }

  interface LightHouseScore {
    performance: number;
    sEO: number;
    accessibility: number;
    bestPractices: number;
  }

  interface categories {
    performance: itemResult;
    accessibility: itemResult;
    bestpractices: itemResult;
    seo: itemResult;
    pwa: itemResult;
  }

  interface itemResult {
    id: string;
    score: number;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.SMS {
  interface SMS {
    context: Kooboo.Data.Context.RenderContext;
    /** Send SMS using AliCloud */
    aliSMS: Ali;
    /** Send SMS using TencentCloud */
    tencent: Tencent;
    /** Send SMS using ChinaMobile */
    chinaMobile: ChinaMobile;
  }

  interface Ali {
    context: Kooboo.Data.Context.RenderContext;
    /** ```ts
k.sms.aliSMS.send("your_ali_template_code", "+8615312345678", "code", "12345");
```
 */
    send(templateCode: string, ToPhoneNumber: string, bindingkey: string, bindingvalue: string): boolean;
    send(templateCode: string, ToPhoneNumber: string, bindings: any): boolean;
    /** ```ts
k.sms.aliSMS.send("your_ali_template_code", "+8115312345678", "code", "12345");
```
 */
    sendInternational(templateCode: string, ToPhoneNumber: string, bindingkey: string, bindingvalue: string): boolean;
  }

  interface Tencent {
    context: Kooboo.Data.Context.RenderContext;
    /** Send SMS using TencentCloud */
    send(templateId: string, ToPhoneNumber: string, Parameters: any): boolean;
  }

  interface ChinaMobile {
    context: Kooboo.Data.Context.RenderContext;
    /** Send SMS using ChinaMobile, to multiple phone numbers */
    send(toPhoneNumbers: string[], content: string): boolean;
    /** Send SMS using ChinaMobile, to single phone number */
    send(toPhoneNumber: string, content: string): boolean;
  }

}
declare namespace Kooboo.Data.Sitemap {
  interface KSitemap extends Kooboo.Data.Interface.IkScript {
    create(): Sitemap;
  }

  interface SitemapSettings {
    enable: boolean;
    path: string;
    autoGenerate: boolean;
    code: string;
  }

  interface Sitemap {
    /** k.sitemap.create().append('https://site.com/?name=ümlat') */
    append(loc: string, options?: AppendOptions): Sitemap;
    build(): string;
  }

  interface AppendOptions {
    /** 2022-1-2 */
    lastmod: string;
    changefreq: Changefreq;
    /** Value range 0.0-1.0 */
    priority: number;
    /** ```
{en:'https://www.kooboo.com/en',zh:'https://www.kooboo.com/zh'}
``` */
    alternates: any;
  }

  type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

}
declare namespace Kooboo.Sites.Scripting.Global.Mail.Models {
  interface MailMessage {
    to: string;
    replyTo: string;
    cc: string;
    bcc: string;
    from: string;
    subject: string;
    textBody: string;
    htmlBody: string;
    ampBody: string;
    body: string;
    attachments: Record<string, any>;
    addAttachment(FullFileNameOrUrl: string): void;
    addAttachment(filename: string, BinaryBytes: number[]): void;
    attachObject(filename: string, obj: any): void;
    toEml(): string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Mail {
  interface SmtpServer {
    host: string;
    ssl: boolean;
    username: string;
    password: string;
    port: number;
  }

  interface MailUtility {
    instance: MailUtility;
    /** Parse Summary from raw mail body */
    parseSummary(MsgBody: string): Kooboo.Mail.Message;
    parseDetail(MsgBody: string): MailDetailViewModel;
    downloadAttachment(MsgBody: string, FileName: string): number[];
  }

  interface SMTPSender {
    /** ```ts
// Send an email message using default smtp
var msg = { to: "user@kooboo.com", from: "12345678@qq.com", subject: "this is a test email", body: "some html body" };  
k.mail.smtp.send(msg);
```
 */
    send(Message: Kooboo.Sites.Scripting.Global.Mail.Models.MailMessage): void;
    /** ```ts
// Send an email using an external smtp server
var msg = k.mail.createMessage(); 
msg.from ="12345678@qq.com";
msg.to = "user@kooboo.cn"; 
msg.subject = "Test Subject"; 
msg.htmlBody = "<div> Html body content </div>";  
msg.addAttachment("https://www.kooboo.cn/img/logo-white.png"); 

var server = k.mail.createSmtpServer();
server.host = "smtp.qq.com";
server.port = 465 ;
server.ssl = true; 
server.username = "12345678@qq.com";
server.password = "your_password_here";  
k.mail.smtp.send(server, msg);
```
 */
    send(SmtpServer: SmtpServer, MailMessage: Kooboo.Sites.Scripting.Global.Mail.Models.MailMessage): void;
  }

  interface Spamassassin {
    local: Server;
    connect(host: string, user: string, port: number): Server;
  }

  interface KMailModule {
    context: Kooboo.Mail.Extension.MailModuleContext;
    baseUrl: string;
    config: any;
    name: string;
    localDatabase: KScript.IDatabase;
    localSqlite: Kooboo.Sites.Scripting.Global.Sqlite.SqliteDatabase;
    list(): Kooboo.Mail.Models.MailModule[];
  }

  interface MailDetailViewModel {
    messageId: string;
    subject: string;
    from: Kooboo.Mail.ViewModel.AddressModel;
    to: Kooboo.Mail.ViewModel.AddressModel[];
    cc: Kooboo.Mail.ViewModel.AddressModel[];
    bcc: Kooboo.Mail.ViewModel.AddressModel[];
    attachments: AttachmentViewModel[];
    html: string;
    date: Date;
    uTCTime: Date;
    localTime: Date;
  }

  interface IDRange {
    lowBound: number;
    highBound: number;
  }

  interface Server {
    /**  
## check a mail is or not a spam.
```
var mail=`Return-Path: <eeiaiyme@sterki.ch>
Date: Wed, 1 Dec 2021 21:41:47 +0800 (CST)
From: huixricky <huixricky@yeah.net>
Sender: eeiaiyme <eeiaiyme@sterki.ch>
To: bruce <bruce@untroubled.org>
Content-Length: 1210

<p>html body</p>`

//if(rsp.spam==true) mail is a spam
//if(rsp.spam==false) mail is not a spam

// this mail current score is 2.2 , critical score is 5.0
// if score >5.0 this mail is spam
// rsp.score => '2.2 / 5.0' 

// only get current score rsp.currentScore=>2.2
// only get critical score rsp.criticalScore=>5.0

var rsp= k.mail.spamassassin.check(mail);
```
 */
    check(mail: string): any;
    /**  
        ## check a mail is or not a spam and generate report.
        ```
        var mail=`Return-Path: <eeiaiyme@sterki.ch>
        Date: Wed, 1 Dec 2021 21:41:47 +0800 (CST)
        From: huixricky <huixricky@yeah.net>
        Sender: eeiaiyme <eeiaiyme@sterki.ch>
        To: bruce <bruce@untroubled.org>
        Content-Length: 1210

        <p>html body</p>`

        //if(rsp.spam==true) mail is a spam
        //if(rsp.spam==false) mail is not a spam

        // this mail current score is 2.2 , critical score is 5.0
        // if score >5.0 this mail is spam
        // rsp.score => '2.2 / 5.0' 

        // only get current score rsp.currentScore=>2.2
        // only get critical score rsp.criticalScore=>5.0

        // rsp.body contain a detailed report
        // 1.0 HK_RANDOM_ENVFROM Envelope sender username looks random
        // -0.0 NO_RELAYS Informational: message was not relayed via SMTP
        // 0.2 HEADER_FROM_DIFFERENT_DOMAINS From and EnvelopeFrom 2nd level
        // ...
        var rsp= k.mail.spamassassin.check(mail);
        ```
         */
    report(mail: string): any;
    /**  check server health.
        //if(rsp.code==0) server health
        var rsp= k.mail.spamassassin.ping();
         */
    ping(): any;
  }

  interface AttachmentViewModel extends Kooboo.Mail.Models.Attachment {
    contentType: string;
    fileName: string;
    type: string;
    subType: string;
    size: number;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.IMAP {
  interface ImapCollector {
    /** ```ts
// Collect list of mail from IMAP server
var setting = {emailAddress: "1323548947@qq.com", host: "imap.qq.com", forceSSL: true, port: 993, password:"your_password_here"}; 
var list = k.mail.imap.collect(setting, 1, 10); 
var msg = k.mail.utility.parseDetail(list[0].rawBody); 
k.response.write(msg.html);
```
 */
    collect(setting: ImapSetting, start: number, count: number): MsgRawBody[];
    /** ```ts
// Collect latest mails from IMAP server
var setting = {emailAddress: "1323548947@qq.com", host: "imap.qq.com", forceSSL: true, port: 993, password:"your_password_here"}; 
var list = k.mail.imap.CollectLatestMails(setting,  10); 
var msg = k.mail.utility.parseDetail(list[0].rawBody); 
k.response.write(msg.html);
```
 */
    collectLatestMails(setting: ImapSetting, count: number): MsgRawBody[];
    /** Get the ID range of current IMAP Setting */
    getRange(setting: ImapSetting): Kooboo.Sites.Scripting.Global.Mail.IDRange;
    /** ```ts
// Get one email item from IMAP server
var setting = {emailAddress: "1323548947@qq.com", host: "imap.qq.com", forceSSL: true, port: 993, password:"your_password_here"}; 
var mail = k.imap.get(setting, 159);  
var msg = k.mail.utility.parseDetail(mail.rawBody);  
k.response.write(msg.html);
```
 */
    get(setting: ImapSetting, UID: number): MsgRawBody;
  }

  interface ImapSetting {
    emailAddress: string;
    password: string;
    host: string;
    forceSSL: boolean;
    port: number;
  }

  interface MsgRawBody {
    uID: number;
    rawBody: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Mail.Amazonses {
  interface Amazonses {
    /** ```ts
var mail = k.mail.amazonses.createEmail({accessKeyId:'EXAMPLE_AWS_ACCESS_KEY_ID' ,secretAccessKey:'EXAMPLE_AWS_SECRET_ACCESS_KEY',region:'EUCentral1'});
var from = 'me@gmail.com';
var to = ['to-someone@gmail.com','to-someone2@gmail.com'];
var subject = 'my subject';
var htmlBody = 'html body';
var textBody = 'text body';
var res = mail.send({from,to,subject,htmlBody,textBody});
k.response.json(res);
```
 */
    createEmail(setting: AwsMailSetting): AwsEmail;
  }

  interface AwsMailSetting {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    charset: string;
  }

  interface AwsEmail {
    /** ```ts
var mail = k.mail.amazonses.createEmail({accessKeyId:'EXAMPLE_AWS_ACCESS_KEY_ID' ,secretAccessKey:'EXAMPLE_AWS_SECRET_ACCESS_KEY',region:'EUCentral1'});
var from = 'me@gmail.com';
var to = ['to-someone@gmail.com','to-someone2@gmail.com'];
var subject = 'my subject';
var htmlBody = 'html body';
var textBody = 'text body';
var res = mail.send({from,to,subject,htmlBody,textBody});
k.response.json(res);
```
 */
    send(mailParam: AwsMailParam): Amazon.SimpleEmail.Model.SendEmailResponse;
    /** ```ts
var msg = k.mail.createMessage();
msg.to = 'test@qq.com';
msg.from = 'sender@qq.com';
msg.cc = 'cc@qq.com'
msg.bcc = 'czh2<test@qq.com>'
msg.subject = 'Subject';
msg.htmlBody = '<html> <body><div>Hello World!</div></body></html>';
msg.addAttachment('https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png');
var pdfHtml = `<!DOCTYPE html>
<html>
<body>
	<div> test test</div>
</body>
</html>`;
var pdf = k.utils.converter.htmlToPdf('fileName.pdf', pdfHtml);
msg.addAttachment('test.pdf', pdf.zipEntries[0].binary);
var mail = k.mail.amazonses.createEmail({ accessKeyId: 'EXAMPLE_AWS_ACCESS_KEY_ID', secretAccessKey: 'EXAMPLE_AWS_SECRET_ACCESS_KEY', region: 'EUCentral1' });
mail.SendRaw(msg);
```
 */
    sendRaw(msg: Kooboo.Sites.Scripting.Global.Mail.Models.MailMessage): Amazon.SimpleEmail.Model.SendEmailResponse;
  }

  interface AwsMailParam {
    from: string;
    to: string[];
    subject: string;
    htmlBody: string;
    textBody: string;
    sourceArn: string;
  }

}
declare namespace KScript.Commerce {
  interface KCategory {
    list(options?: KScript.Commerce.Models.CategoryQueryOptions): KScript.Commerce.Models.CategorySimple[];
    get(seoNameOrId: string): KScript.Commerce.Models.CategoryDetail;
    getParents(seoNameOrId: string): KScript.Commerce.Models.CategorySimple[];
    /** `
k.commerce.category.create({
    description: "<div>category description</div>",
    image: "14.png",
    seoName: "create-from-code",
    tags: ["a", "b"],
    title: "create from code",
})
` */
    create(value: KScript.Commerce.Models.NewCategory): Kooboo.Sites.Commerce.Entities.Category;
    /** update a built-in field
```
k.commerce.category.updateField(
    "41e9df9dd67f4e5e8eb80d8a4644e0d7",
    "seoName",
    "hello-world"
)
```
Update a custom data field
```
k.commerce.category.updateField(
    "41e9df9dd67f4e5e8eb80d8a4644e0d7",
    "date",
    new Date(),
    "zh"
)
``` */
    updateField(id: string, property: string, value: any, lang?: string): void;
    addProduct(id: string, productId: string): void;
    removeProduct(id: string, productId: string): void;
    /** Update fields
```
var updates=[{
    property:"date",value:new Date(),lang:"zh",
    property:"seoName",value:"hello-world",
}]
k.commerce.category.updateFields("41e9df9dd67f4e5e8eb80d8a4644e0d7",updates)
``` */
    updateFields(id: string, updateFields: KScript.Commerce.Models.UpdateFieldParams[]): void;
    delete(id: string): void;
  }

  interface KProduct {
    list(query?: KScript.Commerce.Models.ProductQueryParams): KScript.Commerce.Models.ProductSimple[];
    get(seoNameOrId: string, options?: KScript.Commerce.Models.GetProductOptions): KScript.Commerce.Models.ProductDetail;
    search(keyword: string, options?: KScript.Commerce.Models.SearchOptions): KScript.Commerce.Models.SearchResult;
    create(value: KScript.Commerce.Models.NewProduct): Kooboo.Sites.Commerce.Entities.Product;
    createVariant(productId: string, value: KScript.Commerce.Models.NewProductVariant): Kooboo.Sites.Commerce.Entities.Product;
    deleteVariant(id: string): void;
    delete(id: string): void;
    /** update a built-in field
```
k.commerce.product.updateField(
    "41e9df9dd67f4e5e8eb80d8a4644e0d7",
    "seoName",
    "hello-world"
)
```
Update a custom data field
```
k.commerce.product.updateField(
    "41e9df9dd67f4e5e8eb80d8a4644e0d7",
    "date",
    new Date(),
    "zh"
)
``` */
    updateField(id: string, property: string, value: any, lang?: string): void;
    /** Update fields
```
var updates=[{
    property:"date",value:new Date(),lang:"zh",
    property:"seoName",value:"hello-world",
}]
k.commerce.product.updateFields("41e9df9dd67f4e5e8eb80d8a4644e0d7",updates)
``` */
    updateFields(id: string, updateFields: KScript.Commerce.Models.UpdateFieldParams[]): void;
    addCategory(id: string, categoryId: string): void;
    removeCategory(id: string, categoryId: string): void;
    /** update a field
```
k.commerce.product.updateVariantField(
    "41e9df9dd67f4e5e8eb80d8a4644e0d7",
    "price",
    12.3
)
``` */
    updateVariantField(id: string, property: string, value: any, lang?: string): void;
    /** Update fields
```
var updates=[{
    property:"price",value:12.3,
    property:"tags",value:["a","b"],
}]
k.commerce.product.updateVariantFields("41e9df9dd67f4e5e8eb80d8a4644e0d7",updates)
``` */
    updateVariantFields(id: string, updateFields: KScript.Commerce.Models.UpdateFieldParams[]): void;
    getPriceDetail(variantId: string, options?: KScript.Commerce.Models.ProductPriceOptions): KScript.Commerce.Models.ProductPrice;
    addTextDigitalItem(variantId: string, name: string, text: string): void;
    addLinkDigitalItem(variantId: string, name: string, link: string): void;
    addFileDigitalItem(variantId: string, name: string, filePath: string): void;
    removeDigitalItem(variantId: string, digitalItemId: string): void;
    addReview(model: KScript.Commerce.Models.NewProductReview): void;
    reviewList(variantId: string): Kooboo.Sites.Commerce.DataStorage.ProductReviewModel[];
  }

  interface KCart {
    currentId: string;
    create(options?: KScript.Commerce.Models.CartOptions): string;
    get(cartId: string): Kooboo.Sites.Commerce.Entities.Cart;
    getDetail(cartId: string, options?: KScript.Commerce.Models.GetCartOptions): KScript.Commerce.Models.CartDetail;
    addOrUpdateLine(cartId: string, variantId: string, quantity: number, options?: KScript.Commerce.Models.CartLineOptions): void;
    removeLine(cartId: string, variantId: string, groupName?: string): void;
    updateContact(cartId: string, email: string): void;
    updateDiscountCodes(cartId: string, discountCodes: string[]): void;
    updateShipping(cartId: string, shippingId: string): void;
    updateDigitalShipping(cartId: string, digitalShippingId: string): void;
    updateAdditional(cartId: string, options: KScript.Commerce.Models.CartAdditionalOptions): void;
  }

  interface KOrder {
    create(cartId: string, options: KScript.Commerce.Models.CreateOrderOptions): Kooboo.Sites.Commerce.ViewModels.OrderDetail;
    create(init: KScript.Commerce.Models.CreateOrderInit): Kooboo.Sites.Commerce.ViewModels.OrderDetail;
    get(orderId: string): Kooboo.Sites.Commerce.ViewModels.OrderDetail;
    pay(orderId: string, method: string): void;
    delivery(orderId: string, shippingCarrier: string, trackingNumber: string): void;
    delivery(orderId: string, lineIds: string[]): void;
    updateShippingInfo(orderId: string, orderLineId: string, options: Kooboo.Sites.Commerce.ViewModels.DeliveryOptions): void;
    cancel(orderId: string, reason: string): void;
    reopen(orderId: string): void;
    updateAddress(orderId: string, address: Kooboo.Sites.Commerce.Entities.Address): void;
    list(query?: KScript.Commerce.Models.OrderQuery): Kooboo.Sites.Commerce.ViewModels.OrderDetail[];
    delete(id: string): void;
    updateExtensionField(id: string, property: string, value: string): void;
  }

  interface KCustomer {
    currentId: string;
    get(id: string): Kooboo.Sites.Commerce.Entities.Customer;
    getByEmail(email: string): Kooboo.Sites.Commerce.Entities.Customer;
    getByPhone(phone: string): Kooboo.Sites.Commerce.Entities.Customer;
    getByOAuth(openId: string, type: string): Kooboo.Sites.Commerce.Entities.Customer;
    setOAuth(id: string, openId: string, type: string): void;
    oAuthList(id: string): Kooboo.Sites.Commerce.DataStorage.CustomerOAuthModel[];
    create(model: KScript.Commerce.Models.CreateCustomer): Kooboo.Sites.Commerce.Entities.Customer;
    setPassword(id: string, password: string): void;
    login(email: string, password: string): Kooboo.Sites.Commerce.Entities.Customer;
    logout(): void;
    remove(id: string): void;
    orders(customerId: string, query?: KScript.Commerce.Models.CustomerOrderQuery): KScript.Commerce.Models.OrderResult;
    updateAddresses(id: string, addresses: Kooboo.Sites.Commerce.Entities.Address[]): void;
    updateInfo(id: string, info: KScript.Commerce.Models.UpdateCustomer): void;
    addDiscount(id: string, discountId: string): void;
    getDiscounts(id: string, options?: GetDiscountOptions): CustomerDiscountItem[];
  }

  interface KLoyalty {
    memberships(): Kooboo.Sites.Commerce.Entities.Membership[];
    changeMembership(customerId: string, membershipId: string): void;
    renewMembership(customerId: string): void;
    earnPoints(customerId: string, points: number, description?: string): void;
    redeemPoints(customerId: string, points: number, description?: string): void;
    points(customerId: string, query?: Kooboo.Sites.Commerce.ViewModels.PagingQuery): KScript.Commerce.Models.LoyaltyPointResult;
    info(customerId: string): KScript.Commerce.Models.LoyaltyInfo;
  }

  interface KDiscount {
    list(): Kooboo.Sites.Commerce.Entities.Discount[];
  }

  interface KShipping {
    list(options?: KScript.Commerce.Models.ShippingOptions): KScript.Commerce.Models.ShippingItem[];
    digitalList(): Kooboo.Sites.Commerce.Entities.DigitalShipping[];
  }

  interface KAddress {
    countries(): KScript.Commerce.Models.Country[];
    provinces(country: string): KScript.Commerce.Models.Province[];
    cities(country: string, state: string): KScript.Commerce.Models.City[];
    addressDetail(address: Kooboo.Sites.Commerce.Entities.Address): AddressDetail;
  }

  interface KMembership {
    get(id: string): Kooboo.Sites.Commerce.Entities.Membership;
    list(): Kooboo.Sites.Commerce.Entities.Membership[];
  }

  interface KWishlist {
    add(customerId: string, variantId: string): Kooboo.Sites.Commerce.Entities.Customer;
    remove(customerId: string, variantId: string): Kooboo.Sites.Commerce.Entities.Customer;
    list(customerId: string): Kooboo.Sites.Commerce.DataStorage.WishlistModel[];
  }

  interface KCurrency {
    default: string;
    list(): KScript.Commerce.Models.CurrencyItem[];
    /** var usdAmount=2;
var cnyAmount= k.commerce.currency.convert("USD","CNY",2) */
    convert(from: string, to: string, value: number): number;
  }

  interface GetDiscountOptions {
    cartId: string;
  }

  interface CustomerDiscountItem extends Kooboo.Sites.Commerce.Entities.Discount {
    canUse: boolean;
    used: boolean;
    title: string;
    startDate: Date;
    endDate: Date;
    condition: Kooboo.Sites.Commerce.Condition.Define;
    method: Kooboo.Sites.Commerce.DiscountMethod;
    code: string;
    codeUsageLimit?: number;
    type: Kooboo.Sites.Commerce.DiscountType;
    value: number;
    isPercent: boolean;
    priority: number;
    isExclusion: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface AddressDetail {
    address1: string;
    address2: string;
    city: string;
    cityDetail: KScript.Commerce.Models.City;
    country: string;
    countryDetail: KScript.Commerce.Models.Country;
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    provinceDetail: KScript.Commerce.Models.Province;
    zip: string;
  }

}
declare namespace Kooboo.Sites.Commerce {
  interface Settings {
    currencyCode: string;
    currencySymbol: string;
    currencies: Kooboo.Sites.Commerce.Entities.CurrencyConfig[];
    weightUnit: string;
    earnPoint: Kooboo.Sites.Commerce.RewardPoints.EarnPointSettings;
    redeemPoint: Kooboo.Sites.Commerce.RewardPoints.RedeemPointSettings;
    payments: string[];
    productCustomFields: Kooboo.Sites.Commerce.CustomData.CustomField[];
    categoryCustomFields: Kooboo.Sites.Commerce.CustomData.CustomField[];
    orderExtensionFields: Kooboo.Sites.Commerce.Entities.ExtensionField[];
    enableEmailNotification: boolean;
    customMailServer: Kooboo.Mail.Models.SmtpSetting;
    koobooEmailAddress: string;
    mailServerType: string;
    emailNotifications: Kooboo.Sites.Commerce.Notification.EmailNotification[];
    enableWebhook: boolean;
    webhooks: Kooboo.Sites.Commerce.Notification.Webhook[];
    webhookSecret: string;
    hideAttributes: boolean;
    hideVariants: boolean;
    productDigitalItemRequired: boolean;
  }

  type FilterType = 'Manual' | 'Automated';

  interface Entity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  type DiscountMethod = 'DiscountCode' | 'AutomaticDiscount';

  type DiscountType = 'ProductAmountOff' | 'OrderAmountOff' | 'FreeShipping';

}
declare namespace Kooboo.Sites.OpenApiGenerator {
  interface OpenApiKScriptBase {
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Models {
  interface HashGuidOptions {
    source: HashGuidSource;
  }

  interface UserModel {
    departments: DepartmentModel[];
    organizations: OrganizationModel[];
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    language: string;
    currentOrgId: string;
    isAdmin: boolean;
    id: any;
    changePassword(oldpassword: string, newPassword: string): boolean;
    changePassword(language: string): boolean;
  }

  interface OrganizationModel {
    id: any;
    name: string;
    displayName: string;
    serverLevel: number;
    currency: string;
    isPartner: boolean;
    departments: DepartmentModel[];
    users: UserModel[];
    organizationUsers: UserModel[];
    addDepartment(name: string, displayName: string): void;
    addOrUpdateOrganizationUser(name: string, password: string, isAdmin: boolean): Kooboo.Data.Models.User;
    deleteOrganizationUser(name: string): boolean;
    getOrganizationUser(name: string): Kooboo.Data.Models.User;
  }

  interface ZipItem {
    name: string;
    fullName: string;
    binary: number[];
    getString(): string;
  }

  type HashGuidSource = 'Input' | 'FileIo';

  interface PaginationModel {
    totalCount: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    list: KScript.IDynamicTableObject[];
  }

  interface DepartmentModel {
    id: any;
    name: string;
    display: string;
    users: Kooboo.Data.ViewModel.DepartmentUser[];
    addUser(userName: string, isManager: boolean, userFunction: string): void;
    deleteUser(userName: string): void;
    delete(): void;
    update(displayName: string, parentDepartment: string): void;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Jwt {
  interface kJwt {
    payload: any;
    /** ```ts
// 1.Config
// site=>system=>settings=>JwtSetting,set jwtsecret exp and enableExp

// 2.Example
var token= k.security.jwt.encode({
  name:'alex',
  id: 'xxxx'
});

k.response.write(token)
```
 */
    encode(claims: any): string;
    /** ```ts
// This method will get token in http request authorization header 

// 1.Config
// site=>system=>settings=>JwtSetting,set jwtsecret exp and enableExp

// 2.Example
var result= k.security.jwt.decode()
```
#### Success example:
```json
{
  "code": 0,
  "value": {
    "name": "alex",
    "id": "xxxx"
  }
}
```
#### Error example:
```json
{
  "code": 1,
  "value": "error message"
}
```
 */
    decode(): string;
    /** ```ts
// 1.Config
// site=>system=>settings=>JwtSetting,set jwtsecret exp and enableExp

// 2.Example
const result= k.security.jwt.dncode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiaHVhbmVudCIsImV4cCI6MTYwMjIxNTM4OH0.ZunonM2w-3PJURhW9eBD90zdnw9NCDDIZbCMM6Izsb4');
```
#### Success example:
```json
{
  "code": 0,
  "value": {
    "name": "alex",
    "id": "xxxx"
  }
}
```
#### Error example:
```json
{
  "code": 1,
  "value": "error message"
}
```
 */
    decode(token: string): string;
    /** ```ts
Parse token payload without verify signature

```
const result= k.security.jwt.parsePayload('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiaHVhbmVudCIsImV4cCI6MTYwMjIxNTM4OH0.ZunonM2w-3PJURhW9eBD90zdnw9NCDDIZbCMM6Izsb4');
```
result :

```
{
    code :0,
    value :{
        name:""alex"",
        id:""xxxx""
    }
}
```
or
```
{
    code :1,
    value :""error message""
}
```
```
 */
    parsePayload(token: string): any;
  }

}
declare namespace Kooboo.Lib.Security {
  interface RSAEncryption {
    encrypt(publickey: string, content: string): string;
    decrypt(privatekey: string, content: string): string;
    generateKeys(size: number): RsaKeys;
  }

  interface RsaKeys {
    publicKey: string;
    privateKey: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Privacy {
  interface KCookieConsent {
    setting: CookieConsentSettingViewModel;
    getJSCookies(JSUrl: string, LoadingUrl?: string, tag?: string): Kooboo.Data.Models.CookieItem[];
  }

  interface CookieConsentSettingViewModel {
    enable: boolean;
    displayRule: Kooboo.Data.Models.DisplayRule;
    category: CookieCategoryViewModel[];
    cookieText: Kooboo.Data.Models.CookieText;
    resource: CategoryResourceViewModel[];
    closeButton: Kooboo.Data.Models.closeButtonAction;
    uI: Kooboo.Data.Models.CookieUI;
    fromCookieConsentSetting(setting: Kooboo.Data.Models.CookieConsentSetting, culture: string): CookieConsentSettingViewModel;
  }

  interface CookieCategoryViewModel {
    id: string;
    name: string;
    description: string;
    required: boolean;
    defaultChecked: boolean;
    resource: CategoryResourceViewModel[];
    fromCategory(category: Kooboo.Data.Models.CookieCategory, culture: string, resource: CategoryResourceViewModel[]): CookieCategoryViewModel;
  }

  interface CategoryResourceViewModel {
    cookieCategory: string;
    uRL: string;
    cookieItems: CookieItemViewModel[];
    fromCategoryResource(categoryResource: Kooboo.Data.Models.CategoryResource, culture: string): CategoryResourceViewModel;
  }

  interface CookieItemViewModel {
    name: string;
    description: string;
    expireMinutes: number;
  }

}
declare namespace Kooboo.Data.Interface {
  interface IkScript {
  }

  interface ISiteObject {
    constType: number;
    creationDate: Date;
    lastModified: Date;
    id: any;
    name: string;
  }

  interface ICoreObject {
    online: boolean;
    version: number;
  }

  interface ITextObject extends ISiteObject {
    body: string;
  }

  interface IScriptable {
    requestParas: string[];
  }

  interface IDataSource {
  }

  interface IDynamic {
    values: Record<string, any>;
    getValue(FieldName: string): any;
    getValue(FieldName: string, Context: Kooboo.Data.Context.RenderContext): any;
    setValue(FieldName: string, Value: any): void;
  }

  interface IRepository {
    modelType: any;
    storeName: string;
    store: Kooboo.IndexedDB.IObjectStore;
    addOrUpdate(value: any, UserId?: any): boolean;
    delete(id: any, UserId?: any): number;
    get(id: any, getColumnDataOnly?: boolean): ISiteObject;
    getByNameOrId(NameOrId: string): ISiteObject;
    all(UseColumnData?: boolean): ISiteObject[];
    getByLog(log: Kooboo.IndexedDB.LogEntry): ISiteObject;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(loglist: Kooboo.IndexedDB.LogEntry[]): void;
    getLastEntryFromLog(ObjectId: any): ISiteObject;
    checkOut(VersionId: number, DestinationRepository: IRepository, SelfIncluded: boolean): void;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
  }

  interface IExtensionable extends ISiteObject {
    extension: string;
  }

  interface IEmbeddable extends ITextObject, ISiteObject {
    ownerObjectId: any;
    ownerConstType: number;
    isEmbedded: boolean;
    bodyHash: number;
    koobooOpenTag: string;
    engine: string;
    itemIndex: number;
    domTagName: string;
  }

  interface IBinaryFile extends IExtensionable, ISiteObject {
    contentBytes: number[];
    size: number;
  }

  interface ISiteSetting {
    name: string;
  }

  interface ISettingDescription {
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

  interface SettingFile {
    name: string;
    base64: string;
    bytes: number[];
    stream: any;
  }

  interface IDataMethodSetting extends Kooboo.Data.IGolbalObject, ICoreObject {
    methodName: string;
    displayName: string;
    description: string;
    declareType: string;
    declareTypeHash: any;
    isThirdPartyType: boolean;
    returnType: string;
    isPagedResult: boolean;
    originalMethodName: string;
    methodSignatureHash: any;
    isStatic: boolean;
    isVoid: boolean;
    isGlobal: boolean;
    isPost: boolean;
    isTask: boolean;
    isPublic: boolean;
    codeId: any;
    isKScript: boolean;
    parameters: Record<string, string>;
    parameterBinding: Record<string, ParameterBinding>;
  }

}
declare namespace Kooboo.Sites.Integration {
  interface IIntegrateCommerceProvider {
    getAuthUrl(state?: Kooboo.IntegrateCommerce.PlatformAuthState): string;
    getOrderList(storeId: string, query?: Kooboo.IntegrateCommerce.PlatformOrderListQuery): Kooboo.IntegrateCommerce.PlatformOrderListPage;
    getOrderDetails(storeId: string, id: string): Kooboo.IntegrateCommerce.PlatformOrderDetail;
    setStoreStatus(storeId: string, enable: boolean): string;
    removeStore(storeIds: string[]): string;
    getStores(): Record<string, string>;
    getAttachments(key: string): Kooboo.IntegrateCommerce.SummaryFileInfo[];
    readAttachment(key: string, fileName: string, contentType?: string): void;
    setOrdersCallbackCode(codeBlockName: string): void;
  }

}
declare namespace Kooboo.Data.Context {
  interface RenderContext {
    httpContext: any;
    logInfo: Kooboo.Data.Context.RenderCompleted.LogInfo;
    request: HttpRequest;
    response: HttpResponse;
    outputContext: OutputContext;
    enableTextGZip: boolean;
    dataContext: DataContext;
    webSite: Kooboo.Data.Models.WebSite;
    sessionId: string;
    sessionGuid: any;
    user: Kooboo.Data.Models.User;
    culture: string;
    placeholderContents: Record<string, string>;
    items: Record<string, any>;
    headerBindings: HeaderBindings[];
    isSiteBinding: boolean;
    isBackendView: boolean;
    hasLayoutSet: boolean;
    mockData: boolean;
    isMobile: boolean;
    compressionStore: Kooboo.Data.Server.SiteCompressionStore;
    renderCancelled: boolean;
    defaultDetectDifferentCulture: boolean;
    cookieConsentState: Kooboo.Data.Models.CookieConsentState;
    eCommerceState: Kooboo.Data.Models.CommerceState;
    country: Kooboo.Lib.GeoLocation.CountryLocationModel;
    allowCompression: boolean;
    getHeader(preferredKey: string, fallbackKey?: string): string;
    addPlaceHolderContent(Key: string, value: string): void;
    setItem(value: any, KeyName?: string): void;
    getItem(KeyName?: string): any;
    getItem(keyName: string, Setter: any): any;
    hasItem(KeyName?: string): boolean;
    getOrgId(): any;
    clone(): RenderContext;
    copyTo(type: any): any;
    getSetting(type: any): any;
    findContext(query: string): any;
    enableCORS(SetOriginWildcard?: boolean): void;
    isOptionsRequest(): boolean;
    writeBody(text: string): void;
    writeBody(binaryBytes: number[]): void;
  }

  interface HttpRequest {
    context: RenderContext;
    queryString: Record<string, string>;
    forms: any;
    files: Kooboo.Lib.NETMultiplePart.File[];
    cookies: Record<string, string>;
    path: string;
    url: string;
    contentType: string;
    ifNoneMatch: string;
    relativeUrl: string;
    rawRelativeUrl: string;
    method: string;
    host: string;
    binding: Kooboo.Data.Config.SiteBinding;
    scheme: string;
    postData: number[];
    body: string;
    bodyStream: any;
    model: any;
    iP: string;
    altervativeViews: number[];
    culture: string;
    sitePath: string;
    channel: RequestChannel;
    port: number;
    traceIdentifier: string;
    clientHint: Kooboo.Data.Server.AcceptCH;
    getQueryString(key: string): string;
    getValue(name: string, needDecode?: boolean): string;
    get(name: string): string;
    getValue(names: string[]): string;
    getValue(name: string): any;
    clone(): HttpRequest;
  }

  interface HttpResponse {
    contentType: string;
    body: number[];
    stream: any;
    filePart: Kooboo.IndexedDB.FilePart;
    handleByHttpContext: boolean;
    headers: Record<string, string>;
    deletedCookieNames: string[];
    appendedCookies: any[];
    statusCode: number;
    end: boolean;
    redirectLocation: string;
    segmentResult: RenderSegmentResult;
    appendString(output: string): void;
    appendCookie(CookieName: string, CookieValue: string, days?: number): void;
    appendCookie(CookieName: string, CookieValue: string, expires: Date): void;
    addCookie(cookie: any): void;
    deleteCookie(CookieName: string): void;
    redirect(StatusCode: number, url: string, absolute?: boolean): void;
  }

  interface OutputContext {
    sb: any;
    activeIfResult: ActiveIf;
    slot: SlotManager;
  }

  interface DataContext {
    stack: any[];
    inlineTraceId: any;
    repeatCounter: RepeatCondition;
    onDataPush: (p1:System.Collections.IDictionary,)=>void;
    getValueByObjectType(FullPropertyName: string): any;
    getValueByMemberName(MemberName: string): any;
    getValue(FullPropertyName: string, excludeJsScopeValue?: boolean): any;
    push(key: string, value: any): void;
    push(data: any): void;
    pop(): void;
  }

  interface HeaderBindings {
    metaName: string;
    isTitle: boolean;
    isCustomHeader: boolean;
    isHeaderStyle: boolean;
    isHeaderScript: boolean;
    url: string;
    content: string;
    charSet: string;
    property: string;
    httpEquiv: string;
    requireBinding: boolean;
    valueQuery: HeaderValueQuery;
    getContent(context: RenderContext): string;
  }

  type RequestChannel = 'Default' | 'InlineDesign' | 'Draft' | 'API';

  interface RenderSegmentResult {
    compressType: Kooboo.Data.Server.CompressionType;
    originalLength: number;
    addString(output: string): void;
    addFile(file: Kooboo.IndexedDB.FileIO.CompressionBlobFile): void;
    addEncoded(bytes: number[]): void;
    getPlaceholderIndex(): number;
    replacePlaceholder(Index: number, value: string): void;
  }

  interface ActiveIf {
    itemCount: number;
    push(result: IFCheckResult): void;
    canContinue(currentType: EnumIfConditionType, parentId?: string): boolean;
  }

  interface SlotManager {
    stack: SlotContent[];
    push(result: string, name?: string): void;
    popOff(): void;
    get(name?: string): string;
  }

  interface RepeatCondition {
    currentCounter: RepeaterCounter;
    push(Total: number): void;
    pop(): void;
    check(condition: string): boolean;
  }

  interface HeaderValueQuery {
    isExpression: boolean;
    isString: boolean;
    itemValues: ItemQuery[];
    requireRender: boolean;
    render(context: RenderContext): string;
    tryAssignValue(data: any, context: RenderContext): void;
    initValue(context: RenderContext): void;
  }

  interface IFCheckResult {
    type: EnumIfConditionType;
    result: boolean;
    parentId: string;
  }

  type EnumIfConditionType = 'IF' | 'ElseIf' | 'Else';

  interface SlotContent {
    name: string;
    value: string;
  }

  interface RepeaterCounter {
    total: number;
    current: number;
  }

  interface ItemQuery {
    value: string;
    query: GetValueQuery;
  }

  interface GetValueQuery {
    fullPropertyName: string;
    key: string;
    subProperty: string;
    isMember: boolean;
    memberName: string;
    partialMerge: boolean;
    originalMergeField: string;
    originalValue: string;
  }

}
declare namespace Kooboo.Sites.Payment.Methods {
  interface SquareCheckout extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: SquareSetting;
    /** ```
var result = k.payment.squareCheckout.charge({
    currency: 'USD',
    totalAmount: 0.01;
    name: 'order summary',
    returnUrl: '/order/1234'
})
k.response.redirect(charge.nextAction.redirectUrl)
``` */
    charge(params: KScript.Payment.Square.SquareCheckoutParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    notify(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(requestId: string): any;
  }

  interface WeChatNative extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    supportedCurrency: string[];
    iconType: string;
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: Kooboo.Sites.Payment.Methods.wechat.WeChatV3Setting;
    /** Pay by wechat barcode scan. Example:
```
<script env='server'>
var response = k.payment.wechat.charge({
    currency: 'CNY',
    name: `kooboo order:xxx`,
    totalAmount: 1.50,
    redirectUrl:'/'
})
</script>
<div k-content='response.nextAction.renderHtml'></div>
```
Or use 'response.nextAction.responseData' render your self qrcode.
 */
    charge(params: KScript.Payment.Wechat.WeChatNativeParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface SquareSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    name: string;
    useSandBox: boolean;
    applicationId: string;
    accessToken: string;
    locationId: string;
    baseURL: string;
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

  interface PaynlSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    paynlUrl: string;
    testMode: boolean;
    salesLocationCode: string;
    salesLocationSecret: string;
    code: string;
    token: string;
    name: string;
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

  interface PaypalSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    paypalUrl: string;
    useSandBox: boolean;
    clientId: string;
    secret: string;
    name: string;
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

  interface PaypalFormSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    paypalUrl: string;
    iPNUrl: string;
    emailAddress: string;
    logoImage: string;
    useSandBox: boolean;
    name: string;
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

}
declare namespace Kooboo.Sites.Payment.Methods.wechat {
  interface WeChatApp extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: WeChatV3Setting;
    /** ```ts
const result = k.payment.wechatApp.charge({
    order: '1307d2c7-c5f6-4957-9766-92e485b007b2', // order ID
    totalAmount: 0.01,
    currency: 'CNY',
    name: 'tea',
    description: 'Tea description',
});
```
 */
    charge(chargeParams: KScript.Payment.Model.ChargeParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface WeChatH5 extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: WeChatV3Setting;
    /** ```ts
const result = k.payment.wechatH5.charge({
    order: '1307d2c7-c5f6-4957-9766-92e485b007b2', // order ID
    totalAmount: 0.01,
    currency: 'CNY',
    name: 'tea',
    description: 'Tea description',
});
```
 */
    charge(chargeParams: KScript.Payment.Model.ChargeParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface WeChatJsApi extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: WeChatV3Setting;
    /** ```ts
// Server side
const result = k.payment.wechatJsApi.charge({
    order: '1307d2c7-c5f6-4957-9766-92e485b007b2', // order ID
    totalAmount: 0.01,
    currency: 'CNY',
    name: 'tea',
    description: 'Tea description',
    openId:"<wechat_openid>"
});

// Client side
WeixinJSBridge.invoke('getBrandWCPayRequest',
    JSON.parse(result.nextAction.responseData),
    function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
    }
);
```
 */
    charge(chargeParams: KScript.Payment.Model.WeChatJsApiChargeParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface WeChatV3Setting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    name: string;
    group: string;
    appId: string;
    merchantId: string;
    aPIV3Key: string;
    certificatePrivateKey: Kooboo.Data.Interface.SettingFile;
    certificate: Kooboo.Data.Interface.SettingFile;
    getNotifyUrl(): string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
    validate(): void;
  }

}
declare namespace Kooboo.Sites.Payment.Methods.Stripe {
  interface StripeCheckout extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    supportedCurrency: string[];
    icon: string;
    iconType: string;
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: StripeCheckoutSetting;
    /** 
```
<script env='server'>
  var res = k.payment.stripeCheckout.charge({
    returnUrl: '/order/xxx',
    cancelUrl: '/',
    name: 'T-shirt',
    totalAmount: 1.50,
    currency: 'eur'
  });
</script>
<div k-content='res.nextAction.renderHtml'></div>
``` */
    charge(params: KScript.Payment.Stripe.StripeCheckoutParams): Kooboo.Sites.Payment.ChargeResponse;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface StripePaymentIntent extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    supportedCurrency: string[];
    icon: string;
    iconType: string;
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: StripeSetting;
    charge(params: KScript.Payment.Stripe.StripePaymentIntentParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    /** Get card list from a customer. */
    getCardList(customer: string): any;
    /** Create a card for a customer. */
    createCard(customer: string, card: Kooboo.Sites.Payment.Models.Card): string;
    /** Detaches a PaymentMethod object from a Customer. */
    removeCard(cardId: string): void;
    checkStatus(requestId: string): any;
  }

  interface StripeCheckoutSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription, StripeSetting {
    name: string;
    paymentMethods: string;
    secretKey: string;
    webhookSigningSecret: string;
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

  interface StripeSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    name: string;
    secretKey: string;
    webhookSigningSecret: string;
    group: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

}
declare namespace Kooboo.Sites.Payment.Methods.Paypal {
  interface PaynlCheckout extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: Kooboo.Sites.Payment.Methods.PaynlSetting;
    /** 
```
<script env='server'>
  var res = k.payment.paynl.charge({
    returnUrl: '/order/xxx',
    cancelUrl: '/',
    name: 'T-shirt',
    totalAmount: 1.50,
    currency: 'eur'
  });
</script>
<div k-content='res.nextAction.renderHtml'></div>
``` */
    charge(params: KScript.Payment.Stripe.PaynlCheckoutParams): Kooboo.Sites.Payment.ChargeResponse;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface PaypalCheckout extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: Kooboo.Sites.Payment.Methods.PaypalSetting;
    /** 
```
<script env='server'>
  var res = k.payment.stripeCheckout.charge({
    returnUrl: '/order/xxx',
    cancelUrl: '/',
    name: 'T-shirt',
    totalAmount: 1.50,
    currency: 'eur'
  });
</script>
<div k-content='res.nextAction.renderHtml'></div>
``` */
    charge(params: KScript.Payment.Stripe.PaypalCheckoutParams): Kooboo.Sites.Payment.ChargeResponse;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface PaypalForm extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: Kooboo.Sites.Payment.Methods.PaypalFormSetting;
    /** 
```
<script env='server'>
  var res = k.payment.stripeCheckout.charge({
    returnUrl: '/order/xxx',
    cancelUrl: '/',
    name: 'T-shirt',
    totalAmount: 1.50,
    currency: 'eur'
  });
</script>
<div k-content='res.nextAction.renderHtml'></div>
``` */
    charge(params: KScript.Payment.Stripe.PaypalFormParams): Kooboo.Sites.Payment.ChargeResponse;
    nofityUrl(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface TwoCheckout extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: Kooboo.Sites.Payment.Methods.TwoCheckout.TwoCheckoutSetting;
    /** ```
var result = k.payment.twoCheckout.charge({
    totalAmount: 100,
    currency: "USD",
    name: "TEST order",
    returnUrl: "http://kooboo.com",
    cancelUrl: "http://kooboo.com",
    card: {
        number: "378282246310005",
        expMonth: "03",
        expYear: "2025",
        cvc: "123",
        name: "John Doe"
    },
    cardType: "Amex",
    billingAddress: {
        "Address1": "Test Address",
        "City": "LA",
        "State": "California",
        "CountryCode": "US",
        "Email": "testcustomer@2Checkout.com",
        "FirstName": "Customer",
        "LastName": "2Checkout",
        "Zip": "12345"
    }
})

if(result.nextAction?.redirectUrl){
    // 3d auth
    k.response.redirect(charge.nextAction.redirectUrl)
}else{
    //success paid
}
``` */
    charge(params: KScript.Payment.TowCheckout.TwoCheckoutParams): Kooboo.Sites.Payment.ChargeResponse;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

}
declare namespace Kooboo.Sites.Payment.Methods.MoneyBoxs {
  interface MoneyBoxs extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: MoneyBoxsSetting;
    /** ```
var result = k.payment.moneyBoxs.charge({
    totalAmount: 100,
    currency: "USD",
    name: "TEST order",
    returnUrl: "http://kooboo.com",
    card: {
        number: "378282246310005",
        expMonth: "03",
        expYear: "2025",
        cvc: "123",
        name: "John Doe"
    },
    billingAddress: {
        "Address1": "Test Address",
        "City": "LA",
        "State": "California",
        "CountryCode": "US",
        "Email": "testcustomer@2Checkout.com",
        "FirstName": "Customer",
        "LastName": "2Checkout",
        "Zip": "12345"
    }
})

if(result.nextAction?.redirectUrl){
    // 3d auth
    k.response.redirect(charge.nextAction.redirectUrl)
}else{
    //success paid
}
``` */
    charge(params: MoneyBoxsParams): Kooboo.Sites.Payment.ChargeResponse;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: Kooboo.Sites.Payment.PaymentRequest): Kooboo.Sites.Payment.PaymentStatusResponse;
    verify3DAuthCallback(orderNo: string, merchantNo: string, terminalNo: string, amount: string, hashCode: string, respCode: string): void;
    checkStatus(requestId: string): any;
  }

  interface MoneyBoxsParams extends KScript.Payment.Model.ChargeParams {
    /** MoneyBoxs 3d auth success will redirect to this url */
    returnUrl: string;
    card: Kooboo.Sites.Payment.Models.Card;
    billingAddress: Kooboo.Sites.Payment.Models.Address;
    shipAddress: Kooboo.Sites.Payment.Models.Address;
    goods: Good[];
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface MoneyBoxsSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    name: string;
    group: string;
    baseUrl: string;
    merchantNo: string;
    terminalNo: string;
    key: string;
    transactionURL: string;
    type: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

  interface Good {
    goodsName: string;
    quantity: string;
    goodsPrice: string;
  }

}
declare namespace Kooboo.Sites.Payment.Methods.Alipay {
  interface AlipayApp extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: AlipaySetting;
    /** ```ts
const res = k.payment.alipayApp.charge({
    name: 'Test Alipay App',
    totalAmount: 1.5,
    currency: 'CNY'
});
```
 */
    charge(params: KScript.Payment.Model.ChargeParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: string): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface AlipayForm extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    supportedCurrency: string[];
    iconType: string;
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: AlipaySetting;
    /** ```ts
<script env="server">
    const res = k.payment.alipayForm.charge({
        totalAmount: 1.5,
        name: 'Test Alipay form',
        currency: 'CNY',
        returnUrl: '/success',
    })
</script>
<div env="server">
    {{{res.nextAction.renderHtml}}}
</div>
```
 */
    charge(params: KScript.Payment.Alipay.AlipayFormParams): Kooboo.Sites.Payment.ChargeResponse;
    updateOrder(context: Kooboo.Data.Context.RenderContext): Kooboo.Sites.Payment.PaymentCallback;
    checkStatus(request: string): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface AlipayH5 extends Kooboo.Sites.Payment.IPaymentMethod {
    name: string;
    displayName: string;
    icon: string;
    iconType: string;
    supportedCurrency: string[];
    context: Kooboo.Data.Context.RenderContext;
    /** Account settings to be used for this payment method */
    setting: AlipaySetting;
    /** ```ts
<script env="server">
    const rsp = k.payment.alipayH5.charge({
        name: 'Test Alipay H5',
        totalAmount: 1.5,
        currency: 'CNY',
        returnUrl: '/success'
    })
</script>
<div env="server">{{{rsp.nextAction.renderHtml}}}</div>
```
 */
    charge(params: KScript.Payment.Alipay.AlipayFormParams): Kooboo.Sites.Payment.ChargeResponse;
    checkStatus(request: string): Kooboo.Sites.Payment.PaymentStatusResponse;
    checkStatus(requestId: string): any;
  }

  interface AlipaySetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    name: string;
    group: string;
    useSandBox: boolean;
    appId: string;
    appPrivateKey: string;
    alipayPublicKey: string;
    signType: string;
    charset: string;
    serverUrl: string;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

}
declare namespace Kooboo.Sites.AIBuilder.Application.Model {
  interface WireFrame extends AIModelBase {
    id: any;
    pages: WireFramePage[];
    apis: WireFrameAPI[];
    entities: WireFrameEntity[];
    name: string;
    type: number;
    lastModified: Date;
    jsonModel: string;
    isAnalyzed: boolean;
    analyzedHash: any;
    refId: any;
    entitiesByPage(page: WireFramePage): WireFrameEntity[];
    setAnalyzedHash(): void;
  }

  interface DomainContext extends AIModelBase {
    description: string;
    goal: string;
    keyWords: string;
    language: string;
    id: any;
    name: string;
    type: number;
    lastModified: Date;
    jsonModel: string;
    isAnalyzed: boolean;
    analyzedHash: any;
    refId: any;
    setAnalyzedHash(): void;
  }

  interface Scenario extends AIModelBase {
    module: string;
    description: string;
    locationType: string;
    isAnalyzed: boolean;
    id: any;
    name: string;
    type: number;
    lastModified: Date;
    jsonModel: string;
    analyzedHash: any;
    refId: any;
    setAnalyzedHash(): void;
  }

  interface Fact extends AIModelBase {
    name: string;
    entities: string[];
    factExpression: string;
    isDescriptiveFact: boolean;
    factType: string;
    roles: Role[];
    objectTypes: ObjectType[];
    constraints: Constraint[];
    examples: Example[];
    notes: string;
    analyzedHash: any;
    isAnalyzed: boolean;
    id: any;
    type: number;
    lastModified: Date;
    jsonModel: string;
    refId: any;
    setAnalyzedHash(): void;
    isSingleTon(): boolean;
    getExampleSentence(): string;
    computeContentHash(): any;
  }

  interface WireFramePage {
    route: string;
    inMenu: boolean;
    menuName: string;
    menuIcon: string;
    scenarios: string[];
    apis: string[];
    facts: string[];
  }

  interface WireFrameEntity {
    name: string;
    dbName: string;
    apis: string[];
  }

  interface WireFrameAPI {
    route: string;
    description: string;
    returnType: string;
    method: string;
    entities: string[];
    facts: string[];
  }

  interface AIModelBase {
    id: any;
    name: string;
    type: number;
    lastModified: Date;
    jsonModel: string;
    isAnalyzed: boolean;
    analyzedHash: any;
    refId: any;
    setAnalyzedHash(): void;
  }

  interface Role {
    rolePlayer: string;
    roleName: string;
  }

  interface ObjectType {
    name: string;
    kind: string;
    identifier?: string;
    dataType?: string;
    belongsTo?: string;
    dbName?: string;
  }

  interface Constraint {
    type: string;
    onRoles: string[];
  }

  interface Example {
    sentence: string;
    fields: Field[];
  }

  interface Field {
    fieldName: string;
    value: string;
    dbName: string;
    dataType: string;
    belongsTo: string;
  }

  interface Entity extends AIModelBase {
    id: any;
    facts: any[];
    attributes: EntityAttribute[];
    parentType: string;
    dbName: string;
    otherNames: string[];
    description: string;
    isHumanEdit: boolean;
    source: string;
    modelKind: string;
    storage: string;
    sourceEntities: string[];
    name: string;
    type: number;
    lastModified: Date;
    jsonModel: string;
    isAnalyzed: boolean;
    analyzedHash: any;
    refId: any;
    removeFact(FactId: any): void;
    shouldSaveToDatabase(): boolean;
    setAnalyzedHash(): void;
  }

  interface EntityAttribute {
    name: string;
    otherNames: string[];
    dbName: string;
    dataType: string;
    facts: any[];
    identifier: boolean;
    uniqueness: boolean;
    mandatory: boolean;
    isHumanEdit: boolean;
    computed: boolean;
  }

}
declare namespace Kooboo.Sites.AI.Vectorization {
  interface VectorSearchOptions {
    top: number;
  }

  interface VectorSearchResult {
    scope: number;
    id: string;
  }

  interface SiteVectorSearchService {
    product: VectorSearchService;
    get(name: string): VectorSearchService;
    dispose(): void;
  }

  interface VectorSearchService {
    error: string;
    errorCount: number;
    running: boolean;
    queued: number;
    getAsync(id: string): any;
    addOrUpdate(key: string, value: string, timestamp: number, folder?: string): void;
    syncToDbAsync(): any;
    findAllAsync(keyword: string, folder: string, top: number): any;
    findAllAsync(vector: number[], folder: string, top: number): any;
    deleteAsync(key: string): any;
    deleteAllAsync(): any;
    dispose(): void;
    textToVectorAsync(text: string): any;
  }

}
declare namespace Kooboo.Sites.Render {
  type Type = 'All' | 'Development' | 'Content' | 'Commerce' | 'Route' | 'Self';

  interface CacheVersion {
    all: number;
    development: number;
    content: number;
    commerce: number;
    route: number;
    increase(type: number): void;
    increase(type: Type): void;
    getKey(type: Type, self?: number): string;
  }

}
declare namespace Kooboo.Dom {
  interface Document extends Node {
    baseURI: string;
    isQuirksMode: boolean;
    body: Element;
    head: Element;
    links: HTMLCollection;
    images: HTMLCollection;
    forms: HTMLCollection;
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    getBaseUrl(): string;
    setQuirksMode(): void;
    getElementsByTagName(tagName: string): HTMLCollection;
    getElementsByTagNameNS(namespace: string, localName: string): HTMLCollection;
    getElementsByClassName(classnames: string): HTMLCollection;
    getElementsByCSSSelector(CSSSelector: string): HTMLCollection;
    select(CSSSelector: string): HTMLCollection;
    getElementById(id: string): Element;
    getElementByIndex(TokenIndex: number, IsStartIndex?: boolean): Element;
    getElementByAttribute(AttributeName: string): HTMLCollection;
    getElementByAttributeValue(AttributeName: string, AttributeValue: string): HTMLCollection;
    createElement(localName: string): Element;
    createElementNS(namespace: string, qualifiedName: string): Element;
    createDocumentFragment(): DocumentFragment;
    createTextNode(data: string): Text;
    createNodeIterator(root: Node, whatToShow: enumWhatToShow, filter: NodeFilter): NodeIterator;
    createComment(data: string): Comment;
    createProcessingInstruction(target: string, data: string): ProcessingInstruction;
    importNode(node: Node, deepcopy: boolean): Node;
    adoptNode(node: Node): Node;
    createEvent(interface: string): Event;
    createRange(): Range;
    createTreeWalker(root: Node, whatToShow: enumWhatToShow, filter: NodeFilter): TreeWalker;
    parseStyleSheet(): void;
    applyStyleSheet(mediadeviceinfo: string): void;
    applyStyleSheet(): void;
    applyCssRules(rulelist: Kooboo.Dom.CSS.CSSRuleList, mediadeviceInfo: string): void;
    applyCssText(cssText: string): void;
    dispose(): void;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
  }

  interface HTMLCollection {
    item: Element[];
    length: number;
    add(element: Element): void;
    merge(collection: HTMLCollection): void;
  }

  interface Element extends Node {
    id: string;
    className: string;
    classList: DOMTokenList;
    attributes: Attr[];
    rawComputedStyle: Kooboo.Dom.CSS.CSSStyleDeclaration;
    styleRules: Kooboo.Dom.CSS.CSSStyleRule[];
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    getAttribute(name: string): string;
    getAttributeNS(namespace: string, localName: string): string;
    setAttribute(name: string, value: string): void;
    setAttributeNS(namespace: string, name: string, value: string): void;
    removeAttribute(name: string): void;
    removeAttributeNS(namespace: string, localName: string): void;
    hasAttribute(name: string): boolean;
    hasAttributeNS(namespace: string, localName: string): boolean;
    matches(selectors: string): boolean;
    matches(selectorlist: Kooboo.Dom.CSS.simpleSelector[]): boolean;
    getOneElementByTagName(tagname: string): Element;
    getElementsByTagName(tagName: string): HTMLCollection;
    getElementsByTagNames(tagNames: string[]): HTMLCollection;
    getElementsById(id: string): Element;
    getElementsByAttribute(AttributeName: string): HTMLCollection;
    getElementByIndex(TokenIndex: number, IsStartIndex?: boolean): Element;
    getElementsByAttributeValues(AttributeName: string, AttributeValue: string): HTMLCollection;
    getElementsByTagNameNS(namespace: string, localName: string): HTMLCollection;
    getElementsByClassName(classNames: string): HTMLCollection;
    isEqualNode(node: Node): boolean;
    select(CSSSelector: string): HTMLCollection;
    select(selectorList: Kooboo.Dom.CSS.simpleSelector[]): HTMLCollection;
    dispose(): void;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
  }

  interface DocumentFragment extends Node {
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
    dispose(): void;
  }

  interface Text extends CharacterData {
    data: string;
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    splitText(offset: number): Text;
    wholeText(): string;
    substringData(offset: number, count: number): string;
    appendData(data: string): void;
    appendData(chr: string): void;
    insertData(offset: number, data: string): void;
    deleteData(offset: number, count: number): void;
    replaceData(offset: number, count: number, data: string): void;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
    dispose(): void;
  }

  interface Node {
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
    dispose(): void;
  }

  type enumWhatToShow = 'ELEMENT' | 'ATTRIBUTE' | 'TEXT' | 'CDATA_SECTION' | 'ENTITY_REFERENCE' | 'ENTITY' | 'PROCESSING_INSTRUCTION' | 'COMMENT' | 'DOCUMENT' | 'DOCUMENT_TYPE' | 'DOCUMENT_FRAGMENT' | 'NOTATION' | 'All';

  interface NodeFilter {
    acceptNode(node: Node): enumNodeFilterAcceptNode;
  }

  interface NodeIterator {
    root: Node;
    allowChildAsRoot: boolean;
    referenceNode: Node;
    pointerBeforeReferenceNode: boolean;
    whatToShow: enumWhatToShow;
    filter: NodeFilter;
    filterNode(node: Node): enumNodeFilterAcceptNode;
    nextNode(): Node;
    previousNode(): Node;
    detach(): void;
    following(): Node;
    nextSibling(node: Node): Node;
    proceeding(): Node;
  }

  interface Comment extends CharacterData {
    data: string;
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    substringData(offset: number, count: number): string;
    appendData(data: string): void;
    appendData(chr: string): void;
    insertData(offset: number, data: string): void;
    deleteData(offset: number, count: number): void;
    replaceData(offset: number, count: number, data: string): void;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
    dispose(): void;
  }

  interface ProcessingInstruction extends CharacterData {
    data: string;
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    substringData(offset: number, count: number): string;
    appendData(data: string): void;
    appendData(chr: string): void;
    insertData(offset: number, data: string): void;
    deleteData(offset: number, count: number): void;
    replaceData(offset: number, count: number, data: string): void;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
    dispose(): void;
  }

  interface Event {
  }

  interface Range {
  }

  interface TreeWalker {
    root: Node;
    filterNode(node: Node): enumNodeFilterAcceptNode;
    parentNode(): Node;
    firstChild(): Node;
    firstChild(node: Node): Node;
    lastChild(node: Node): Node;
    lastChild(): Node;
    traverseChildren(type: TraverseType, currentnode: Node): Node;
    previousSibling(node: Node): Node;
    previousSibling(): Node;
    nextSibling(node: Node): Node;
    nextSibling(): Node;
    traverseSibling(type: TraverseType, currentnode: Node): Node;
    previousNode(): Node;
    previousNode(currentnode: Node): Node;
    nextNode(): Node;
    nextNode(currentnode: Node): Node;
  }

  type enumNodeComparePosition = 'DOCUMENT_POSITION_DISCONNECTED' | 'DOCUMENT_POSITION_PRECEDING' | 'DOCUMENT_POSITION_FOLLOWING' | 'DOCUMENT_POSITION_CONTAINS' | 'DOCUMENT_POSITION_CONTAINED_BY' | 'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC' | 'DOCUMENT_POSITION_SAME_NODE';

  interface DOMTokenList {
    length: number;
    contains(token: string): boolean;
    add(tokens: string[]): void;
    remove(tokens: string[]): void;
    toggle(token: string): boolean;
    toggle(token: string, force: boolean): boolean;
  }

  interface Attr {
  }

  interface CharacterData extends Node {
    data: string;
    nodeName: string;
    nodeValue: string;
    textContent: string;
    parentNode: Node;
    parentElement: Element;
    itemIndex: number;
    innerHtml: string;
    outerHtml: string;
    substringData(offset: number, count: number): string;
    appendData(data: string): void;
    appendData(chr: string): void;
    insertData(offset: number, data: string): void;
    deleteData(offset: number, count: number): void;
    replaceData(offset: number, count: number, data: string): void;
    hasChildNodes(): boolean;
    firstChild(): Node;
    lastChild(): Node;
    previousSibling(): Node;
    nextSibling(): Node;
    isEqualNode(node: Node): boolean;
    contains(other: Node): boolean;
    compareDocumentPoistion(other: Node): enumNodeComparePosition;
    normalize(): void;
    cloneNode(deepcopy: boolean): Node;
    insertBefore(node: Node, child: Node): Node;
    appendChild(node: Node): Node;
    replaceChild(node: Node, child: Node): Node;
    removeChild(child: Node): Node;
    getNodePath(includeSelf: boolean): Node[];
    dispose(): void;
  }

  type enumNodeFilterAcceptNode = 'FILTER_ACCEPT' | 'FILTER_REJECT' | 'FILTER_SKIP';

  type TraverseType = 'First' | 'Last' | 'Previous' | 'Next';

}
declare namespace Kooboo.Data.GeoLocation {
  interface IPInfo {
    city: string;
    state: string;
    countryCode: string;
    countryName: string;
    continentCode: string;
    latitude: number;
    longitude: number;
    aSNDomain: string;
    iPUserType: IpUserType;
    appendCityResult(cityRes: CityResponse): void;
    appendAsnResult(asn: ASNResponse): void;
    appendCountryResult(country: CountryResponse): void;
  }

  interface CityResponse {
    cityName: string;
    zhName: string;
    countryCode: string;
    continentCode: string;
    latitude: number;
    longitude: number;
  }

  interface ASNResponse {
    aSN: string;
    name: string;
    org: string;
    domain: string;
    countryCode: string;
    iPUserType: IpUserType;
    detectUserType(): IpUserType;
  }

  interface CountryResponse {
    continentCode: string;
    countryCode: string;
  }

  type IpUserType = 'Unknown' | 'Residential' | 'Hosting' | 'Education' | 'Business' | 'Government';

}
declare namespace Kooboo.Data.WebSocket {
  interface WebSocketContext {
    text: string;
    binary: number[];
    type: string;
  }

  interface WebSocketConnection {
    /** 
Close this connection
```
const connection= k.webSocket.get('user_1');
connection.close();
```
         */
    close(status?: any, statusDescription?: string): any;
    /** 
Send a text message
```
const connection= k.webSocket.get('user_1');
connection.sendBinary([23,32,23,],()=>{
    // after send message
});
```
         */
    sendBinary(binary: number[], callback?: Function): any;
    /** 
Send a binary message
```
const connection= k.webSocket.get('user_1');
connection.sendText('hello',()=>{
    // after send message
});
```
         */
    sendText(text: string, callback?: Function): any;
  }

}
declare namespace Kooboo.Sites.ScriptModules.Models {
  interface ResourceType {
    name: string;
    displayName: string;
    type: EnumResourceType;
    isText: boolean;
    isBinary: boolean;
    defaultExtension: string;
    defaultContentType: string;
    extensions: Extension[];
  }

  type EnumResourceType = 'undefined' | 'view' | 'css' | 'js' | 'Api' | 'img' | 'file' | 'root' | 'backend' | 'code' | 'externalLink';

  interface Extension {
    type: FileType;
    name: string;
    display: string;
  }

  type FileType = 'html' | 'css' | 'javascript';

}
declare namespace Kooboo.Data {
  interface IGolbalObject {
    id: any;
  }

  type ScriptType = 'Classic' | 'Module';

}
declare namespace Kooboo.Sites.OAuth2.WeChat {
  interface WeChatLogin extends Kooboo.Sites.OAuth2.IOAuth2 {
    /** 
1.Config
site=>system=>settings=>WeChatLoginSetting

appid:xxx
secret:xxx
callbackCodeName:wxcallback

2.Create callbackCode script
development=>code=>create event code

name:wxcallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.weChat.getAuthUrl({
            state: 'custom_state'
        })
    </script>
    <a k-href='url'>wechat login</a>
</div>
```
 */
    getAuthUrl(params: any): string;
    /** 
1.Config
site=>system=>settings=>WeChatLoginSetting

appid:xxx
secret:xxx
callbackCodeName:wxcallback

2.Create callbackCode script
development=>code=>create event code

name:wxcallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.weChat.getAuthUrl()
    </script>
    <a k-href='url'>wechat login</a>
</div>
```
 */
    getAuthUrl(): string;
    /** 
1.Config
site=>system=>settings=>WeChatLoginSetting

appid:xxx
secret:xxx
callbackCodeName:wxcallback

2.Create callbackCode script
development=>code=>create event code
name:wxcallback

code:
k.response.write(k.request.body)

3.Add page
<div>
    <div id='qrcode_container'></div>
    <script src='https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'></script>
    <div id='json_data' style='display:none'>
        <script engine='kscript'>
            k.response.write(k.account.oAuth.weChat.getAuthJson({
                                id:'qrcode_container',
                                state:'custom_state'
                            }))
        </script>
    </div>
    <script>
        var json=document.getElementById('json_data').innerText
        new WxLogin(JSON.parse(json));
    </script>
</div>
 */
    getAuthJson(params: any): string;
  }

}
declare namespace Kooboo.Sites.OAuth2.Weibo {
  interface WeiboLogin extends Kooboo.Sites.OAuth2.IOAuth2 {
    /** 
1.Config
site=>system=>settings=>WeibotLoginSetting

appid:xxx
secret:xxx
callbackCodeName:wbcallback

2.Create callbackCode script
development=>code=>create event code

name:wbcallback
code:
k.response.write(k.request.body)

3.Add page
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.weibo.getAuthUrl()
    </script>
    <a k-href='url'>weibo login</a>
</div>
 */
    getAuthUrl(): string;
  }

}
declare namespace Kooboo.Sites.OAuth2.Google {
  interface GoogleLogin extends Kooboo.Sites.OAuth2.IOAuth2 {
    /** 
1.Config
site=>system=>settings=>GoogleLoginSetting

appid:xxx
secret:xxx
callbackCodeName:googlecallback

2.Create callbackCode script
development=>code=>create event code

name:googlecallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.google.getAuthUrl({
            state:'custom_state'
        })
    </script>
    <a k-href='url'>google login</a>
</div>
```
 */
    getAuthUrl(params: any): string;
    /** 
1.Config
site=>system=>settings=>GoogleLoginSetting

appid:xxx
secret:xxx
callbackCodeName:googlecallback

2.Create callbackCode script
development=>code=>create event code

name:googlecallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.google.getAuthUrl()
    </script>
    <a k-href='url'>google login</a>
</div>
```
 */
    getAuthUrl(): string;
  }

  interface FacebookLogin extends Kooboo.Sites.OAuth2.IOAuth2 {
    /** 
1.Config
site=>system=>settings=>FacebookLoginSetting

appid:xxx
secret:xxx
callbackCodeName:fbcallback
fields:

2.Create callbackCode script
development=>code=>create event code

name:fbcallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.facebook.getAuthUrl({
            state:'custom_state'
        })
    </script>
    <a k-href='url'>facebook login</a>
</div>
```
 */
    getAuthUrl(params: any): string;
    /** 
1.Config
site=>system=>settings=>FacebookLoginSetting

appid:xxx
secret:xxx
callbackCodeName:fbcallback
fields:

2.Create callbackCode script
development=>code=>create event code

name:fbcallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.facebook.getAuthUrl()
    </script>
    <a k-href='url'>facebook login</a>
</div>
```
 */
    getAuthUrl(): string;
  }

}
declare namespace Kooboo.Sites.OAuth2.Apple {
  interface AppleLogin extends Kooboo.Sites.OAuth2.IOAuth2 {
    /** 
1.Config
site=>system=>settings=>AppleLoginSetting

appid:xxx
secret:xxx
callbackCodeName:applecallback

2.Create callbackCode script
development=>code=>create event code

name:applecallback
code:
k.response.write(k.request.body)

3.Add page
```
<div>
    <script engine='kscript'>
        var url = k.account.oAuth.apple.getAuthUrl({
            state:'custom_state'
            scope:'openid email name'
        })
    </script>
    <a k-href='url'>apple login</a>
</div>
```
 */
    getAuthUrl(params: any): string;
    /** 
1.Config
site=>system=>settings=>AppleLoginSetting

appid:xxx
secret:xxx
callbackCodeName:applecallback

2. invoke this method, and transfer first step get code, and get access_code and refresh_code

```
 */
    getToken(params: any): any;
    callback(query: any): string;
  }

}
declare namespace Kooboo.Sites.OAuth2.ActiveDirectory {
  interface ActiveDirectoryHelper {
    /** 
resource:your website url.
clientId:.
secret:.
tenantId:.
 */
    getToken(resource: string, clientId: string, secret: string, tenantId: string): any;
  }

}
declare namespace Kooboo.Data.Models.CreditCard {
  interface CreditCardPaymentResult {
    success: boolean;
    redirectUrl: string;
    paymentIntentId: string;
    message: string;
  }

}
declare namespace Kooboo.Data.Models.Market {
  interface CCPaymentMethod {
    id: string;
    last4: string;
    expYear: string;
    expMonth: string;
    type: string;
    isDefault: boolean;
  }

}
declare namespace Kooboo.Data.Models.Ideal {
  interface IdealPaymentRequest {
    /** e.g. https://www.kooboo.com/payment_callback */
    returnUrl: string;
    /** e.g. 10.5 */
    amount: number;
    /** e.g. EUR */
    currency: string;
    orderId: any;
  }

  interface IdealPaymentResult {
    success: boolean;
    redirectUrl: string;
    paymentIntentId: string;
    message: string;
  }

}
declare namespace KScript.Commerce.Models {
  interface FacetResult {
    name: string;
    labels: Label[];
  }

  interface CategoryQueryOptions {
    includeOffline: boolean;
  }

  interface CategorySimple {
    id: string;
    title: string;
    seoName: string;
    description: string;
    image: string;
    imageMeta: string;
    active: boolean;
    tags: string[];
    parentId: string;
  }

  interface CategoryDetail {
    id: string;
    title: string;
    seoName: string;
    description: string;
    image: string;
    imageMeta: string;
    active: boolean;
    parentId: string;
    tags: string[];
    path: CategorySimple[];
    children: CategorySimple[];
  }

  interface NewCategory {
    title: string;
    seoName: string;
    description: string;
    image: string;
    active: boolean;
    parentId: string;
    tags: string[];
  }

  interface UpdateFieldParams {
    property: string;
    value: any;
    lang: string;
  }

  interface ProductQueryParams {
    categories: string[];
    includeSubCategory: boolean;
    includeOffline: boolean;
    currency: string;
  }

  interface ProductSimple {
    id: string;
    title: string;
    featuredImage: string;
    images: string[];
    imageMetas: string;
    active: boolean;
    isDigital: boolean;
    seoName: string;
    tags: string[];
    attributes: any[];
    variants: Variant[];
    variantOptions: VariantOption[];
    currency: Kooboo.Sites.Commerce.Entities.Currency;
    symbol: string;
  }

  interface GetProductOptions {
    currency: string;
  }

  interface ProductDetail {
    id: string;
    title: string;
    description: string;
    featuredImage: string;
    active: boolean;
    isDigital: boolean;
    images: string[];
    imageMetas: string;
    seoName: string;
    tags: string[];
    attributes: KScript.KeyValue[];
    variants: Variant[];
    categories: CategorySimple[];
    variantOptions: VariantOption[];
    currency: Kooboo.Sites.Commerce.Entities.Currency;
  }

  interface SearchOptions {
    facetParams: FacetParam[];
    categories: string[];
    includeSubCategory: boolean;
    includeOffline: boolean;
    currency: string;
  }

  interface SearchResult {
    list: ProductSimple[];
    facets: FacetResult[];
  }

  interface NewProduct {
    title: string;
    description: string;
    attributes: KScript.KeyValue[];
    active: boolean;
    seoName: string;
    featuredImage: string;
    images: string[];
    tags: string[];
    variantImage: string;
    price: number;
    inventory: number;
    isDigital: boolean;
    autoDelivery: boolean;
    maxDownloadCount?: number;
    maxDownloadDay?: number;
  }

  interface NewProductVariant {
    barcode: string;
    sku: string;
    image: string;
    price: number;
    active: boolean;
    selectedOptions: Kooboo.Sites.Commerce.Entities.Option[];
    weight: number;
    inventory: number;
    tags: string[];
    autoDelivery: boolean;
  }

  interface ProductPriceOptions {
    customerId: string;
    currency: string;
  }

  interface ProductPrice {
    currency: Kooboo.Sites.Commerce.Entities.Currency;
    originalAmount: number;
    amount: number;
  }

  interface NewProductReview {
    customerId: string;
    variantId: string;
    rating: number;
    comment: string;
    images: string[];
  }

  interface CartOptions {
    /** Display a extension button on Kooboo commerce backend page. */
    extensionButton: Kooboo.Sites.Commerce.Entities.ExtensionButton;
    insuranceAmount?: number;
  }

  interface GetCartOptions {
    currency: string;
    country: string;
    province: string;
    city: string;
  }

  interface CartDetail {
    id: string;
    contact: string;
    country: string;
    currency: Kooboo.Sites.Commerce.Entities.Currency;
    discountCodes: string[];
    activeDiscountCodes: string[];
    note: string;
    discountAllocations: Kooboo.Sites.Commerce.Calculate.DiscountAllocation[];
    shippingAllocations: Kooboo.Sites.Commerce.Calculate.ShippingAllocation[];
    shippingAmount: number;
    insuranceAmount: number;
    subtotalAmount: number;
    totalAmount: number;
    taxAmount: number;
    totalQuantity: number;
    redeemPoints: number;
    pointsDeductionAmount: number;
    earnPoints: number;
    shipping: Kooboo.Sites.Commerce.Entities.Shipping;
    lines: CartDetailLine[];
  }

  interface CartLineOptions {
    /** Cart line with same group name value will become a bundle product. */
    groupName: string;
    /** Main product or not on a bundle product. */
    isMain: boolean;
    note: string;
    /** Display a extension button on Kooboo commerce backend page. */
    extensionButton: Kooboo.Sites.Commerce.Entities.ExtensionButton;
  }

  interface CartAdditionalOptions {
    /** Display a extension button on Kooboo commerce backend page. */
    extensionButton: Kooboo.Sites.Commerce.Entities.ExtensionButton;
    insuranceAmount?: number;
    redeemPoints?: boolean;
  }

  interface CreateOrderOptions {
    scheduledDeliveryTime?: Date;
    note: string;
    address: Kooboo.Sites.Commerce.Entities.Address;
    extensionFields: KScript.KeyValue[];
    currency: string;
  }

  interface CreateOrderInit {
    note: string;
    source: string;
    address: Kooboo.Sites.Commerce.Entities.Address;
    shippingAmount: number;
    customerId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    extensionButton: Kooboo.Sites.Commerce.Entities.ExtensionButton;
    extensionFields: KScript.KeyValue[];
    lines: CreateOrderLineInit[];
    currency: string;
  }

  interface OrderQuery extends CustomerOrderQuery {
    customerId: string;
    paid?: boolean;
    delivered?: boolean;
    canceled?: boolean;
    startDate?: Date;
    endDate?: Date;
    pageIndex: number;
    pageSize: number;
  }

  interface CreateCustomer {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
  }

  interface CustomerOrderQuery extends Kooboo.Sites.Commerce.ViewModels.PagingQuery {
    paid?: boolean;
    delivered?: boolean;
    canceled?: boolean;
    startDate?: Date;
    endDate?: Date;
    pageIndex: number;
    pageSize: number;
  }

  interface OrderResult {
    list: Kooboo.Sites.Commerce.ViewModels.OrderDetail[];
    count: number;
    pageIndex: number;
    pageSize: number;
  }

  interface UpdateCustomer {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    tags: string[];
  }

  interface LoyaltyPointResult {
    list: Kooboo.Sites.Commerce.DataStorage.CustomerPointModel[];
    count: number;
    pageIndex: number;
    pageSize: number;
  }

  interface LoyaltyInfo {
    points: number;
    membershipStatus: MembershipStatus;
  }

  interface ShippingOptions {
    cartId: string;
    currency: string;
  }

  interface ShippingItem {
    id: string;
    name: string;
    description: string;
    baseCost: number;
    additionalCosts: Kooboo.Sites.Commerce.Entities.AdditionalCost[];
    isDefault: boolean;
    countries: Kooboo.Sites.Commerce.Entities.SupportCountry[];
    currentCost: number;
    code: string;
    currency: string;
    symbol: string;
  }

  interface Country {
    code: string;
    name: string;
    nameTranslations: Record<string, string>;
    currency: string;
    currencySymbol: string;
    emojiFlag: string;
  }

  interface Province {
    country: string;
    name: string;
    nameTranslations: Record<string, string>;
  }

  interface City {
    country: string;
    province: string;
    name: string;
    nameTranslations: Record<string, string>;
  }

  interface CurrencyItem {
    name: string;
    nameNative: string;
    code: string;
    symbol: string;
    exchangeRate: number;
  }

  interface Label {
    name: string;
    count: number;
  }

  interface Variant {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    barcode: string;
    sku: string;
    image: string;
    imageMeta: string;
    price: number;
    active: boolean;
    selectedOptions: Kooboo.Sites.Commerce.Entities.Option[];
    weight: number;
    inventory: number;
    order: number;
    sales: number;
    tags: string[];
    digitals: Kooboo.Sites.Commerce.Entities.DigitalItem[];
    getSelectedOptions(selectedOptions: Kooboo.Sites.Commerce.Entities.Option[], lang: string, options: Kooboo.Sites.Commerce.Entities.VariantOption[]): Kooboo.Sites.Commerce.Entities.Option[];
  }

  interface VariantOption extends VariantOptionItem {
    items: VariantOptionItem[];
    name: string;
    value: string;
    image: string;
  }

  interface FacetParam {
    name: string;
    label: string;
  }

  interface CartDetailLine {
    variantId: string;
    productId: string;
    title: string;
    options: Kooboo.Sites.Commerce.Entities.Option[];
    sku: string;
    image: string;
    originalPrice: number;
    price: number;
    discountAllocations: Kooboo.Sites.Commerce.Calculate.DiscountAllocation[];
    quantity: number;
    totalQuantity: number;
    amount: number;
    taxAmount: number;
    inventory: number;
    groupName: string;
    isMain: boolean;
    note: string;
  }

  interface CreateOrderLineInit {
    image: string;
    price: number;
    quantity: number;
    title: string;
    extensionButton: Kooboo.Sites.Commerce.Entities.ExtensionButton;
  }

  interface MembershipStatus {
    membership: Kooboo.Sites.Commerce.Entities.Membership;
    startedAt: Date;
    endAt: Date;
    active: boolean;
  }

  interface VariantOptionItem {
    name: string;
    value: string;
    image: string;
  }

}
declare namespace Kooboo.Sites.Repository {
  interface SiteDb {
    id: any;
    name: string;
    databaseDb: Kooboo.IndexedDB.Database;
    webSite: Kooboo.Data.Models.WebSite;
    cacheVersion: Kooboo.Sites.Render.CacheVersion;
    layouts: LayoutRepository;
    continueConverter: ContinueConvertRepository;
    dataMethodSettings: DataMethodSettingRepository;
    syncSettings: SyncSettingRepository;
    syncLog: Kooboo.Sites.Sync.SiteSync;
    abTestStore: Kooboo.Sites.Analytics.ABTest.AbTestStore;
    aIAppStore: Kooboo.Sites.AIBuilder.Application.AppBuilderStore;
    aICommerceStore: any;
    cssClassName: CssClassNameRepository;
    scriptModule: ScriptModuleRepository;
    coreSetting: CoreSettingRepository;
    siteCluster: SiteClusterRepository;
    clusterManager: Kooboo.Sites.Sync.SiteClusterSync.SiteClusterManager;
    menus: MenuRepository;
    transferTasks: TransferTaskRepository;
    transferPages: TransferPageRepository;
    siteRepos: Record<string, IRepository>;
    files: CmsFileRepository;
    codeLog: Kooboo.Sites.Scripting.Global.Logging.CodeLogStore;
    folders: FolderRepository;
    routes: RouteRepository;
    forms: FormRepository;
    formSetting: FormSettingRepository;
    formValues: FormValueRepository;
    images: ImageRepository;
    pages: PageRepository;
    views: ViewRepository;
    scripts: ScriptRepository;
    commerceData: CommerceDataRepository;
    mediaMetadata: MediaMetadataRepository;
    code: CodeRepository;
    aIFunction: Kooboo.Sites.AI.Functions.Custom.SiteAIFunctionRepository;
    rules: BusinessRuleRepository;
    backendRules: Kooboo.Sites.BackendEvent.BackendRuleRepository;
    relations: RelationRepository;
    searchIndex: SearchIndexRepository;
    vectorSearch: Kooboo.Sites.AI.Vectorization.SiteVectorSearchService;
    viewDataMethods: ViewDataMethodRepository;
    downloadFailedLog: DownloadFailTrackRepository;
    siteUser: SiteUserRepository;
    shopifyFolder: string;
    commerceFolder: string;
    logFolder: string;
    codeLogFolder: string;
    siteLogVideoFolder: string;
    errorLog: Kooboo.Data.Storage.ErrorLogStore;
    log: Kooboo.IndexedDB.EditLog;
    styles: StyleRepository;
    resourceGroups: ResourceGroupRepository;
    cssRules: CmsCssRuleRepository;
    externalResource: ExternalResourceRepository;
    thumbnails: ThumbnailRepository;
    labels: LabelRepository;
    kConfig: kConfigRepository;
    htmlBlocks: HtmlBlockRepository;
    contentFolders: ContentFolderRepository;
    contentTypes: ContentTypeRepository;
    contentCategories: ContentCategoryRepository;
    textContent: TextContentRepository;
    authentication: AuthenticationRepository;
    openApi: OpenApiRepository;
    job: JobRepository;
    userOptions: UserOptionsRepository;
    spaMultilingual: SpaMultilingualRepository;
    openApiAuthorize: OpenApiAuthorizeRepository;
    getSize(): Kooboo.Sites.ViewModel.DiskSize;
    getRepository(ModelType: any): Kooboo.Data.Interface.IRepository;
    getRepository(ConstType: number): Kooboo.Data.Interface.IRepository;
    getRepository(StoreName: string): Kooboo.Data.Interface.IRepository;
    getStoreName(constType: number): string;
    getSiteRepository(): any;
    activeRepositories(): Kooboo.Data.Interface.IRepository[];
    getSiteRepository(): any;
    getSiteRepository(RepositoryType: any): Kooboo.Data.Interface.IRepository;
    getSiteRepository(RepositoryType: any, siteModelType: any): Kooboo.Data.Interface.IRepository;
    getSiteRepositoryByModelType(ModelType: any): Kooboo.Data.Interface.IRepository;
    isStoreExists(ModelType: any): boolean;
    routeTree(ConstType?: number): Kooboo.Sites.Routing.PathTree;
    errorLogByWeek(weekName: string): Kooboo.Data.Storage.ErrorLogStore;
    clearLog(storeNames: string[]): void;
  }

  interface SearchOptions {
    highlightPreTag: string;
    highlightPostTag: string;
    folders: string[];
    skipCount?: number;
    maxCount?: number;
    fragmentMaxSize?: number;
    includeObject: boolean;
  }

  interface SearchResult {
    id: any;
    type: string;
    title: string;
    object: any;
    summary: string;
    url: string;
    additional: Record<string, any>;
    scope: number;
  }

  interface LayoutRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Layout): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Layout, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Layout, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Layout): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Layout;
    getFromCache(id: any): Kooboo.Sites.Models.Layout;
    get(nameorid: string): Kooboo.Sites.Models.Layout;
    getWithEvent(id: any): Kooboo.Sites.Models.Layout;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Layout;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Layout;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Layout;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Layout[];
    all(): Kooboo.Sites.Models.Layout[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Layout[];
    isEqual(x: Kooboo.Sites.Models.Layout, y: Kooboo.Sites.Models.Layout): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Layout): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ContinueConvertRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    store: any;
    query: any;
    tableScan: any;
    addConverter(ConvertType: string, OriginalPageId: any, ConvertedTag: string, ObjectNameOrId: string, KoobooId: string, ElementPaths: string[], ElementTag: string): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.SiteTransfer.Model.ContinueConverter): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.Model.ContinueConverter, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.Model.ContinueConverter, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.Model.ContinueConverter): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    getFromCache(id: any): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    get(nameorid: string): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    getWithEvent(id: any): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    getByUrl(relativeUrl: string): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.SiteTransfer.Model.ContinueConverter;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.SiteTransfer.Model.ContinueConverter[];
    all(): Kooboo.Sites.SiteTransfer.Model.ContinueConverter[];
    list(UseColumnData?: boolean): Kooboo.Sites.SiteTransfer.Model.ContinueConverter[];
    isEqual(x: Kooboo.Sites.SiteTransfer.Model.ContinueConverter, y: Kooboo.Sites.SiteTransfer.Model.ContinueConverter): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.SiteTransfer.Model.ContinueConverter): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface DataMethodSettingRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getByFolder(FolderId: any): Kooboo.Data.Models.DataMethodSetting[];
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    init(): void;
    isEqualTo(value: Kooboo.Data.Models.DataMethodSetting): boolean;
    addOrUpdate(value: Kooboo.Data.Models.DataMethodSetting, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Data.Models.DataMethodSetting, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Data.Models.DataMethodSetting): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Data.Models.DataMethodSetting;
    getFromCache(id: any): Kooboo.Data.Models.DataMethodSetting;
    get(nameorid: string): Kooboo.Data.Models.DataMethodSetting;
    getWithEvent(id: any): Kooboo.Data.Models.DataMethodSetting;
    getByUrl(relativeUrl: string): Kooboo.Data.Models.DataMethodSetting;
    getMetaByUrl(relativeUrl: string): Kooboo.Data.Models.DataMethodSetting;
    getByNameOrId(NameOrGuid: string): Kooboo.Data.Models.DataMethodSetting;
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Data.Models.DataMethodSetting[];
    all(): Kooboo.Data.Models.DataMethodSetting[];
    list(UseColumnData?: boolean): Kooboo.Data.Models.DataMethodSetting[];
    isEqual(x: Kooboo.Data.Models.DataMethodSetting, y: Kooboo.Data.Models.DataMethodSetting): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Data.Models.DataMethodSetting): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface SyncSettingRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    store: any;
    query: any;
    tableScan: any;
    ignorePushStore(SyncSettingId: any, storeName: string): void;
    removeIgnorePushStore(SyncSettingId: any, storeName: string): void;
    ignorePullStore(SyncSettingId: any, storeName: string): void;
    removeIgnorePullStore(SyncSettingId: any, storeName: string): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.SyncSetting): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SyncSetting, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SyncSetting, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SyncSetting): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.SyncSetting;
    getFromCache(id: any): Kooboo.Sites.Models.SyncSetting;
    get(nameorid: string): Kooboo.Sites.Models.SyncSetting;
    getWithEvent(id: any): Kooboo.Sites.Models.SyncSetting;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.SyncSetting;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.SyncSetting;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.SyncSetting;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.SyncSetting[];
    all(): Kooboo.Sites.Models.SyncSetting[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.SyncSetting[];
    isEqual(x: Kooboo.Sites.Models.SyncSetting, y: Kooboo.Sites.Models.SyncSetting): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.SyncSetting): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface CssClassNameRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.CssClassName): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CssClassName, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CssClassName, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CssClassName): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.CssClassName;
    getFromCache(id: any): Kooboo.Sites.Models.CssClassName;
    get(nameorid: string): Kooboo.Sites.Models.CssClassName;
    getWithEvent(id: any): Kooboo.Sites.Models.CssClassName;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.CssClassName;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.CssClassName;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.CssClassName;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.CssClassName[];
    all(): Kooboo.Sites.Models.CssClassName[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.CssClassName[];
    isEqual(x: Kooboo.Sites.Models.CssClassName, y: Kooboo.Sites.Models.CssClassName): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.CssClassName): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ScriptModuleRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.ScriptModule): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ScriptModule, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ScriptModule, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ScriptModule): boolean;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.ScriptModule;
    getFromCache(id: any): Kooboo.Sites.Models.ScriptModule;
    get(nameorid: string): Kooboo.Sites.Models.ScriptModule;
    getWithEvent(id: any): Kooboo.Sites.Models.ScriptModule;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.ScriptModule;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.ScriptModule;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.ScriptModule;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.ScriptModule[];
    all(): Kooboo.Sites.Models.ScriptModule[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.ScriptModule[];
    isEqual(x: Kooboo.Sites.Models.ScriptModule, y: Kooboo.Sites.Models.ScriptModule): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.ScriptModule): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface CoreSettingRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(value: Kooboo.Sites.Models.CoreSetting): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CoreSetting, UserId: any): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    getSetting(): any;
    getSiteSetting(siteSettingType: any): any;
    addOrUpdate(setting: Kooboo.Data.Interface.ISiteSetting): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.CoreSetting): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CoreSetting, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.CoreSetting;
    getFromCache(id: any): Kooboo.Sites.Models.CoreSetting;
    get(nameorid: string): Kooboo.Sites.Models.CoreSetting;
    getWithEvent(id: any): Kooboo.Sites.Models.CoreSetting;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.CoreSetting;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.CoreSetting;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.CoreSetting;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.CoreSetting[];
    all(): Kooboo.Sites.Models.CoreSetting[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.CoreSetting[];
    isEqual(x: Kooboo.Sites.Models.CoreSetting, y: Kooboo.Sites.Models.CoreSetting): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.CoreSetting): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface SiteClusterRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getByIp(ip: string): Kooboo.Sites.Models.SiteCluster;
    updateVersion(SiteClusterId: any, newversion: number): void;
    addOrUpdate(value: Kooboo.Sites.Models.SiteCluster): boolean;
    add(newcluster: Kooboo.Sites.Models.SiteCluster): boolean;
    update(oldvalue: Kooboo.Sites.Models.SiteCluster, newvalue: Kooboo.Sites.Models.SiteCluster): boolean;
    delete(id: any): number;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.SiteCluster): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteCluster, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteCluster, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.SiteCluster;
    getFromCache(id: any): Kooboo.Sites.Models.SiteCluster;
    get(nameorid: string): Kooboo.Sites.Models.SiteCluster;
    getWithEvent(id: any): Kooboo.Sites.Models.SiteCluster;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.SiteCluster;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.SiteCluster;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.SiteCluster;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.SiteCluster[];
    all(): Kooboo.Sites.Models.SiteCluster[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.SiteCluster[];
    isEqual(x: Kooboo.Sites.Models.SiteCluster, y: Kooboo.Sites.Models.SiteCluster): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.SiteCluster): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface MenuRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Menu;
    addOrUpdate(value: Kooboo.Sites.Models.Menu): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Menu, UserId: any): boolean;
    isNameAvailable(MenuName: string): boolean;
    getNewMenuName(): string;
    swap(RootId: any, IdA: any, IdB: any, UserId?: any): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Menu): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Menu, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Menu;
    getFromCache(id: any): Kooboo.Sites.Models.Menu;
    get(nameorid: string): Kooboo.Sites.Models.Menu;
    getWithEvent(id: any): Kooboo.Sites.Models.Menu;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Menu;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Menu;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Menu[];
    all(): Kooboo.Sites.Models.Menu[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Menu[];
    isEqual(x: Kooboo.Sites.Models.Menu, y: Kooboo.Sites.Models.Menu): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Menu): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface TransferTaskRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    continueDownloading: Record<string, DownloadingTask>;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    setDone(TaskId: any): void;
    isInProgress(): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.TransferTask, UserId?: any): boolean;
    cancelDownload(): void;
    firstImportHost(): string;
    history(): HistoryItem[];
    updateCookie(taskid: any, cookiecontainer: any): void;
    getCookieContainer(TaskId: any): any;
    getCookieContainer(Domain: string): any;
    getCookieContainerByFullUrl(fullurl: string): any;
    canStartDownload(relativeUrl: string): any;
    releaseDownload(relativeUrl: string): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.SiteTransfer.TransferTask): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.TransferTask, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.TransferTask): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.SiteTransfer.TransferTask;
    getFromCache(id: any): Kooboo.Sites.SiteTransfer.TransferTask;
    get(nameorid: string): Kooboo.Sites.SiteTransfer.TransferTask;
    getWithEvent(id: any): Kooboo.Sites.SiteTransfer.TransferTask;
    getByUrl(relativeUrl: string): Kooboo.Sites.SiteTransfer.TransferTask;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.SiteTransfer.TransferTask;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.SiteTransfer.TransferTask;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.SiteTransfer.TransferTask[];
    all(): Kooboo.Sites.SiteTransfer.TransferTask[];
    list(UseColumnData?: boolean): Kooboo.Sites.SiteTransfer.TransferTask[];
    isEqual(x: Kooboo.Sites.SiteTransfer.TransferTask, y: Kooboo.Sites.SiteTransfer.TransferTask): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.SiteTransfer.TransferTask): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface TransferPageRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.SiteTransfer.TransferPage): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.TransferPage, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.TransferPage, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.SiteTransfer.TransferPage): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.SiteTransfer.TransferPage;
    getFromCache(id: any): Kooboo.Sites.SiteTransfer.TransferPage;
    get(nameorid: string): Kooboo.Sites.SiteTransfer.TransferPage;
    getWithEvent(id: any): Kooboo.Sites.SiteTransfer.TransferPage;
    getByUrl(relativeUrl: string): Kooboo.Sites.SiteTransfer.TransferPage;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.SiteTransfer.TransferPage;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.SiteTransfer.TransferPage;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.SiteTransfer.TransferPage[];
    all(): Kooboo.Sites.SiteTransfer.TransferPage[];
    list(UseColumnData?: boolean): Kooboo.Sites.SiteTransfer.TransferPage[];
    isEqual(x: Kooboo.Sites.SiteTransfer.TransferPage, y: Kooboo.Sites.SiteTransfer.TransferPage): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.SiteTransfer.TransferPage): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface CmsFileRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    upload(contentBytes: number[], fullName: string, UserId: any): Kooboo.Sites.Models.CmsFile;
    getVersion(Id: any): number;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.CmsFile): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CmsFile, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CmsFile, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CmsFile): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.CmsFile;
    getFromCache(id: any): Kooboo.Sites.Models.CmsFile;
    get(nameorid: string): Kooboo.Sites.Models.CmsFile;
    getWithEvent(id: any): Kooboo.Sites.Models.CmsFile;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.CmsFile;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.CmsFile;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.CmsFile;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.CmsFile[];
    all(): Kooboo.Sites.Models.CmsFile[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.CmsFile[];
    isEqual(x: Kooboo.Sites.Models.CmsFile, y: Kooboo.Sites.Models.CmsFile): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.CmsFile): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface FolderRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getSubFolders(ParentFullPath: string, ConstObjectType: number): Kooboo.Sites.Models.Folder[];
    combineFolder(Base: string, sub: string): string;
    getDescendantFolders(ParentFullPath: string, ConstObjectType: number): Kooboo.Sites.Models.Folder[];
    getFolder(FullPath: string, ConstyObjectType: number): Kooboo.Sites.Models.Folder;
    addOrUpdate(ConstType: number, Path: string): void;
    getFolderObjects(FolderPath: string, UseColumnDataOnly?: boolean, Recursive?: boolean): any[];
    getFolderObjects(FolderPath: string, ConstObjectType: number, UseColumnDataOnly?: boolean, Recursive?: boolean): Kooboo.Sites.Models.SiteObject[];
    getFolderObjectRouteIds(FolderPath: string, ConstType: number, Recursive?: boolean): any[];
    delete(FolderFullPath: string, ConstType: number, UserId?: any): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Folder): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Folder, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Folder, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Folder): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Folder;
    getFromCache(id: any): Kooboo.Sites.Models.Folder;
    get(nameorid: string): Kooboo.Sites.Models.Folder;
    getWithEvent(id: any): Kooboo.Sites.Models.Folder;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Folder;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Folder;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Folder;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Folder[];
    all(): Kooboo.Sites.Models.Folder[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Folder[];
    isEqual(x: Kooboo.Sites.Models.Folder, y: Kooboo.Sites.Models.Folder): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Folder): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface RouteRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(relativeUrl: string, ConstType: number, objectId: any, UserId?: any): void;
    addOrUpdate(relativeUrl: string, siteobject: Kooboo.Sites.Models.SiteObject, UserId?: any): void;
    addOrUpdate(value: Kooboo.Sites.Routing.Route, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Routing.Route): boolean;
    appendRoute(route: Kooboo.Sites.Routing.Route, UserId: any): void;
    ensureExists(relativeUrl: string, ConstType: number): void;
    getByType(ConstType: number): Kooboo.Sites.Routing.Route[];
    changeRoute(OldRelativeUrl: string, NewRelativeUrl: string, objectId?: any): void;
    getByUrl(relativeUrl: string): Kooboo.Sites.Routing.Route;
    getByObjectId(objectId: any, DestinationConstType?: number): Kooboo.Sites.Routing.Route;
    getRoutesByObjectId(ObjectId: any, destConstantType: number): Kooboo.Sites.Routing.Route[];
    delete(RelativeUrl: string): void;
    delete(id: any, UserId: any): number;
    delete(id: any): number;
    getObjectPrimaryRelativeUrl(objectId: any): string;
    validate(RouteName: string, ObjectId: any): boolean;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Routing.Route): boolean;
    addOrUpdate(value: Kooboo.Sites.Routing.Route, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Routing.Route;
    getFromCache(id: any): Kooboo.Sites.Routing.Route;
    get(nameorid: string): Kooboo.Sites.Routing.Route;
    getWithEvent(id: any): Kooboo.Sites.Routing.Route;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Routing.Route;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Routing.Route;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Routing.Route[];
    all(): Kooboo.Sites.Routing.Route[];
    list(UseColumnData?: boolean): Kooboo.Sites.Routing.Route[];
    isEqual(x: Kooboo.Sites.Routing.Route, y: Kooboo.Sites.Routing.Route): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Routing.Route): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface FormRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository, IEmbeddableRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    listByObjectId(ObjectId: any, constType?: number): Kooboo.Sites.Models.Form[];
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    addOrUpdate(Value: Kooboo.Sites.Models.Form, UserId?: any): boolean;
    addOrUpdate(Value: Kooboo.Sites.Models.Form, updateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): boolean;
    delete(id: any, UpdateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): number;
    delete(id: any, UserId?: any): number;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Form;
    removeEmbedded(value: Kooboo.Sites.Models.Form): void;
    removeExternalStyleScript(value: Kooboo.Sites.Models.Form): void;
    clean(value: Kooboo.Sites.Models.Form): void;
    updateEmbedded(Value: Kooboo.Sites.Models.Form, body: string, userId: any): void;
    getExternals(): Kooboo.Sites.Models.Form[];
    getEmbeddeds(Distinct?: boolean): Kooboo.Sites.Models.Form[];
    countSameEmbedded(BodyHash: number): number;
    getSameEmbedded(BodyHash: number): Kooboo.Sites.Models.Form[];
    getByOwnerId(OwnerId: any, OwnerConstType: number): Kooboo.Sites.Models.Form[];
    upload(contentBytes: number[], fullName: string, UserId: any, modelHandler?: (p1:Kooboo.Sites.Models.Form,)=>void): Kooboo.Sites.Models.Form;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Form): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Form, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Form): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Form;
    getFromCache(id: any): Kooboo.Sites.Models.Form;
    get(nameorid: string): Kooboo.Sites.Models.Form;
    getWithEvent(id: any): Kooboo.Sites.Models.Form;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Form;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Form;
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Form[];
    all(): Kooboo.Sites.Models.Form[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Form[];
    isEqual(x: Kooboo.Sites.Models.Form, y: Kooboo.Sites.Models.Form): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Form): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface FormSettingRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getByFormId(FormId: any): Kooboo.Sites.Models.FormSetting;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.FormSetting): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.FormSetting, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.FormSetting, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.FormSetting): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.FormSetting;
    getFromCache(id: any): Kooboo.Sites.Models.FormSetting;
    get(nameorid: string): Kooboo.Sites.Models.FormSetting;
    getWithEvent(id: any): Kooboo.Sites.Models.FormSetting;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.FormSetting;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.FormSetting;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.FormSetting;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.FormSetting[];
    all(): Kooboo.Sites.Models.FormSetting[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.FormSetting[];
    isEqual(x: Kooboo.Sites.Models.FormSetting, y: Kooboo.Sites.Models.FormSetting): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.FormSetting): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface FormValueRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.FormValue): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.FormValue, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.FormValue, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.FormValue): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.FormValue;
    getFromCache(id: any): Kooboo.Sites.Models.FormValue;
    get(nameorid: string): Kooboo.Sites.Models.FormValue;
    getWithEvent(id: any): Kooboo.Sites.Models.FormValue;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.FormValue;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.FormValue;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.FormValue;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.FormValue[];
    all(): Kooboo.Sites.Models.FormValue[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.FormValue[];
    isEqual(x: Kooboo.Sites.Models.FormValue, y: Kooboo.Sites.Models.FormValue): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.FormValue): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ImageRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    listUsedBy(ConstType: number): Kooboo.Sites.Models.Image[];
    addOrUpdate(value: Kooboo.Sites.Models.Image, UserId: any): boolean;
    listUsedByRelation(image: Kooboo.Sites.Models.Image, constType?: number): Kooboo.Sites.Relation.ObjectRelation[];
    uploadImage(contentBytes: number[], fullName: string, UserId: any, alt?: string): Kooboo.Sites.Models.Image;
    listUsedByPage(PageId: any, UseColumnData?: boolean): Kooboo.Sites.Models.Image[];
    listUsedByObjects(objectIds: any[]): Kooboo.Sites.Models.Image[];
    listUsedByPageStyle(PageId: any): Kooboo.Sites.Models.Image[];
    search(keyword: string, skip?: number, count?: number): Kooboo.Sites.Models.Image[];
    getImageVersion(Id: any): number;
    getBinaryView(Id: any): Kooboo.Sites.Repository.BinaryView.ImageBinaryView;
    getBinaryView(BlockPosition: number): Kooboo.Sites.Repository.BinaryView.ImageBinaryView;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Image): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Image, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Image): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Image;
    getFromCache(id: any): Kooboo.Sites.Models.Image;
    get(nameorid: string): Kooboo.Sites.Models.Image;
    getWithEvent(id: any): Kooboo.Sites.Models.Image;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Image;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Image;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Image;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Image[];
    all(): Kooboo.Sites.Models.Image[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Image[];
    isEqual(x: Kooboo.Sites.Models.Image, y: Kooboo.Sites.Models.Image): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Image): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface PageRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getRelatedObjectIds(page: Kooboo.Sites.Models.Page): any[];
    getStyles(page: Kooboo.Sites.Models.Page): any[];
    getRelatedOwnerObjectIds(PageId: any): any[];
    getRelatedOwnerObjectIds(page: Kooboo.Sites.Models.Page): any[];
    getAllMethodIds(PageId: any): any[];
    getRelatedObject(ObjectId: any, DestinationConstTypes: number[]): Record<number, any>;
    addOrUpdate(value: Kooboo.Sites.Models.Page): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Page, UserId: any): boolean;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Page): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Page, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Page;
    getFromCache(id: any): Kooboo.Sites.Models.Page;
    get(nameorid: string): Kooboo.Sites.Models.Page;
    getWithEvent(id: any): Kooboo.Sites.Models.Page;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Page;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Page;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Page;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Page[];
    all(): Kooboo.Sites.Models.Page[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Page[];
    isEqual(x: Kooboo.Sites.Models.Page, y: Kooboo.Sites.Models.Page): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Page): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ViewRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    updateDataSources(ViewId: any, ViewDataMethods: Kooboo.Sites.Models.ViewDataMethod[], UserId?: any): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.View): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.View, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.View, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.View): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.View;
    getFromCache(id: any): Kooboo.Sites.Models.View;
    get(nameorid: string): Kooboo.Sites.Models.View;
    getWithEvent(id: any): Kooboo.Sites.Models.View;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.View;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.View;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.View;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.View[];
    all(): Kooboo.Sites.Models.View[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.View[];
    isEqual(x: Kooboo.Sites.Models.View, y: Kooboo.Sites.Models.View): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.View): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ScriptRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository, IEmbeddableRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(Value: Kooboo.Sites.Models.Script, UserId?: any): boolean;
    addOrUpdate(Value: Kooboo.Sites.Models.Script, updateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): boolean;
    delete(id: any, UpdateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): number;
    delete(id: any, UserId?: any): number;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Script;
    removeEmbedded(value: Kooboo.Sites.Models.Script): void;
    removeExternalStyleScript(value: Kooboo.Sites.Models.Script): void;
    clean(value: Kooboo.Sites.Models.Script): void;
    updateEmbedded(Value: Kooboo.Sites.Models.Script, body: string, userId: any): void;
    getExternals(): Kooboo.Sites.Models.Script[];
    getEmbeddeds(Distinct?: boolean): Kooboo.Sites.Models.Script[];
    countSameEmbedded(BodyHash: number): number;
    getSameEmbedded(BodyHash: number): Kooboo.Sites.Models.Script[];
    getByOwnerId(OwnerId: any, OwnerConstType: number): Kooboo.Sites.Models.Script[];
    upload(contentBytes: number[], fullName: string, UserId: any, modelHandler?: (p1:Kooboo.Sites.Models.Script,)=>void): Kooboo.Sites.Models.Script;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Script): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Script, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Script): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Script;
    getFromCache(id: any): Kooboo.Sites.Models.Script;
    get(nameorid: string): Kooboo.Sites.Models.Script;
    getWithEvent(id: any): Kooboo.Sites.Models.Script;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Script;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Script;
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Script[];
    all(): Kooboo.Sites.Models.Script[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Script[];
    isEqual(x: Kooboo.Sites.Models.Script, y: Kooboo.Sites.Models.Script): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Script): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface CommerceDataRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.CommerceData): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CommerceData, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CommerceData, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CommerceData): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.CommerceData;
    getFromCache(id: any): Kooboo.Sites.Models.CommerceData;
    get(nameorid: string): Kooboo.Sites.Models.CommerceData;
    getWithEvent(id: any): Kooboo.Sites.Models.CommerceData;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.CommerceData;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.CommerceData;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.CommerceData;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.CommerceData[];
    all(): Kooboo.Sites.Models.CommerceData[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.CommerceData[];
    isEqual(x: Kooboo.Sites.Models.CommerceData, y: Kooboo.Sites.Models.CommerceData): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.CommerceData): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface MediaMetadataRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.MediaMetadata): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.MediaMetadata, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.MediaMetadata, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.MediaMetadata): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.MediaMetadata;
    getFromCache(id: any): Kooboo.Sites.Models.MediaMetadata;
    get(nameorid: string): Kooboo.Sites.Models.MediaMetadata;
    getWithEvent(id: any): Kooboo.Sites.Models.MediaMetadata;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.MediaMetadata;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.MediaMetadata;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.MediaMetadata;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.MediaMetadata[];
    all(): Kooboo.Sites.Models.MediaMetadata[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.MediaMetadata[];
    isEqual(x: Kooboo.Sites.Models.MediaMetadata, y: Kooboo.Sites.Models.MediaMetadata): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.MediaMetadata): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface CodeRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository, IEmbeddableRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    listByCodeType(codeType: Kooboo.Sites.Models.CodeType): Kooboo.Sites.Models.Code[];
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Code;
    all(): Kooboo.Sites.Models.Code[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Code[];
    addOrUpdate(Value: Kooboo.Sites.Models.Code, UserId?: any): boolean;
    addOrUpdate(Value: Kooboo.Sites.Models.Code, updateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): boolean;
    delete(id: any, UpdateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): number;
    delete(id: any, UserId?: any): number;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Code;
    removeEmbedded(value: Kooboo.Sites.Models.Code): void;
    removeExternalStyleScript(value: Kooboo.Sites.Models.Code): void;
    clean(value: Kooboo.Sites.Models.Code): void;
    updateEmbedded(Value: Kooboo.Sites.Models.Code, body: string, userId: any): void;
    getExternals(): Kooboo.Sites.Models.Code[];
    getEmbeddeds(Distinct?: boolean): Kooboo.Sites.Models.Code[];
    countSameEmbedded(BodyHash: number): number;
    getSameEmbedded(BodyHash: number): Kooboo.Sites.Models.Code[];
    getByOwnerId(OwnerId: any, OwnerConstType: number): Kooboo.Sites.Models.Code[];
    upload(contentBytes: number[], fullName: string, UserId: any, modelHandler?: (p1:Kooboo.Sites.Models.Code,)=>void): Kooboo.Sites.Models.Code;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Code): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Code, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Code): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    getFromCache(id: any): Kooboo.Sites.Models.Code;
    get(nameorid: string): Kooboo.Sites.Models.Code;
    getWithEvent(id: any): Kooboo.Sites.Models.Code;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Code;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Code;
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Code[];
    isEqual(x: Kooboo.Sites.Models.Code, y: Kooboo.Sites.Models.Code): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Code): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface BusinessRuleRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    listByEventType(eventType: Kooboo.Sites.FrontEvent.enumEventType): Kooboo.Sites.Models.BusinessRule[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.BusinessRule): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.BusinessRule, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.BusinessRule, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.BusinessRule): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.BusinessRule;
    getFromCache(id: any): Kooboo.Sites.Models.BusinessRule;
    get(nameorid: string): Kooboo.Sites.Models.BusinessRule;
    getWithEvent(id: any): Kooboo.Sites.Models.BusinessRule;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.BusinessRule;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.BusinessRule;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.BusinessRule;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.BusinessRule[];
    all(): Kooboo.Sites.Models.BusinessRule[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.BusinessRule[];
    isEqual(x: Kooboo.Sites.Models.BusinessRule, y: Kooboo.Sites.Models.BusinessRule): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.BusinessRule): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface RelationRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(objectXId: any, objectYId: any, ConstTypeX: number, ConstTypeY: number, RouteDestionType?: number): void;
    getRelations(objectXId: any, RelationObjectConstType?: number): Kooboo.Sites.Relation.ObjectRelation[];
    cleanObjectRelation(ObjectId: any): void;
    getRelationViaRoutes(objectXId: any, constDestinationObjectType?: number): Kooboo.Sites.Relation.ObjectRelation[];
    getReferredByRelations(objectYId: any, RelationObjectConstTypeX?: number): Kooboo.Sites.Relation.ObjectRelation[];
    getReferredBy(SiteObject: Kooboo.Sites.Models.SiteObject, ConstTypeX?: number): Kooboo.Sites.Relation.ObjectRelation[];
    getReferredBy(siteObjectType: any, ObjectId: any, ConstTypeX?: number): Kooboo.Sites.Relation.ObjectRelation[];
    getExternalRelations(objectXId: any, DestinationObjectType: number): Kooboo.Sites.Relation.ObjectRelation[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Relation.ObjectRelation): boolean;
    addOrUpdate(value: Kooboo.Sites.Relation.ObjectRelation, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Relation.ObjectRelation, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Relation.ObjectRelation): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Relation.ObjectRelation;
    getFromCache(id: any): Kooboo.Sites.Relation.ObjectRelation;
    get(nameorid: string): Kooboo.Sites.Relation.ObjectRelation;
    getWithEvent(id: any): Kooboo.Sites.Relation.ObjectRelation;
    getByUrl(relativeUrl: string): Kooboo.Sites.Relation.ObjectRelation;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Relation.ObjectRelation;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Relation.ObjectRelation;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Relation.ObjectRelation[];
    all(): Kooboo.Sites.Relation.ObjectRelation[];
    list(UseColumnData?: boolean): Kooboo.Sites.Relation.ObjectRelation[];
    isEqual(x: Kooboo.Sites.Relation.ObjectRelation, y: Kooboo.Sites.Relation.ObjectRelation): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Relation.ObjectRelation): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface SearchIndexRepository {
    indexType: number[];
    folder: string;
    siteDb: SiteDb;
    logFolder: string;
    log: any;
    getLog(weektime: Date): any;
    getLog(weekname: string): any;
    getWeekNames(): string[];
    searchCount(WeekName: string): Record<string, number>;
    lastestSearch(count: number): SearchLog[];
    getMetaKey(siteobject: Kooboo.Data.Interface.ISiteObject): string;
    getBody(siteobject: Kooboo.Data.Interface.ISiteObject, siteDb: SiteDb): string;
    addOrUpdate(siteobject: Kooboo.Data.Interface.ISiteObject, siteDb: SiteDb, searchType: Kooboo.Data.Models.SearchType, updateReference?: boolean): void;
    delete(siteobject: Kooboo.Data.Interface.ISiteObject, searchType: Kooboo.Data.Models.SearchType): void;
    search(keywords: string, options?: SearchOptions, context?: Kooboo.Data.Context.RenderContext): SearchResult[];
    setData(recordSet: SearchResult[], keywords: string, context: Kooboo.Data.Context.RenderContext, options: SearchOptions): void;
    sync(SiteDb: SiteDb, Value: Kooboo.Data.Interface.ISiteObject, ChangeType: Kooboo.ChangeType, StoreName: string, searchType: Kooboo.Data.Models.SearchType): void;
    rebuild(): void;
    closeLuceneServices(): void;
    delSelf(): void;
  }

  interface ViewDataMethodRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    flatListByView(ViewId: any): Kooboo.Sites.Models.ViewDataMethod[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.ViewDataMethod): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ViewDataMethod, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ViewDataMethod, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ViewDataMethod): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.ViewDataMethod;
    getFromCache(id: any): Kooboo.Sites.Models.ViewDataMethod;
    get(nameorid: string): Kooboo.Sites.Models.ViewDataMethod;
    getWithEvent(id: any): Kooboo.Sites.Models.ViewDataMethod;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.ViewDataMethod;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.ViewDataMethod;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.ViewDataMethod;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.ViewDataMethod[];
    all(): Kooboo.Sites.Models.ViewDataMethod[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.ViewDataMethod[];
    isEqual(x: Kooboo.Sites.Models.ViewDataMethod, y: Kooboo.Sites.Models.ViewDataMethod): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.ViewDataMethod): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface DownloadFailTrackRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.DownloadFailTrack): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.DownloadFailTrack, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.DownloadFailTrack, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.DownloadFailTrack): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.DownloadFailTrack;
    getFromCache(id: any): Kooboo.Sites.Models.DownloadFailTrack;
    get(nameorid: string): Kooboo.Sites.Models.DownloadFailTrack;
    getWithEvent(id: any): Kooboo.Sites.Models.DownloadFailTrack;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.DownloadFailTrack;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.DownloadFailTrack;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.DownloadFailTrack;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.DownloadFailTrack[];
    all(): Kooboo.Sites.Models.DownloadFailTrack[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.DownloadFailTrack[];
    isEqual(x: Kooboo.Sites.Models.DownloadFailTrack, y: Kooboo.Sites.Models.DownloadFailTrack): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.DownloadFailTrack): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface SiteUserRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(value: Kooboo.Sites.Models.SiteUser): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteUser, UserId: any): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.SiteUser): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteUser, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.SiteUser;
    getFromCache(id: any): Kooboo.Sites.Models.SiteUser;
    get(nameorid: string): Kooboo.Sites.Models.SiteUser;
    getWithEvent(id: any): Kooboo.Sites.Models.SiteUser;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.SiteUser;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.SiteUser;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.SiteUser;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.SiteUser[];
    all(): Kooboo.Sites.Models.SiteUser[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.SiteUser[];
    isEqual(x: Kooboo.Sites.Models.SiteUser, y: Kooboo.Sites.Models.SiteUser): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.SiteUser): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface StyleRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository, IEmbeddableRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedBy(Style: Kooboo.Sites.Models.Style): Kooboo.Data.Models.UsedByRelation[];
    getImports(StyleId: any): any[];
    getUsedByPageId(style: Kooboo.Sites.Models.Style): any[];
    addOrUpdate(Value: Kooboo.Sites.Models.Style, UserId?: any): boolean;
    addOrUpdate(Value: Kooboo.Sites.Models.Style, updateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): boolean;
    delete(id: any, UpdateSource?: boolean, UpdateSameEmbedded?: boolean, UserId?: any): number;
    delete(id: any, UserId?: any): number;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Style;
    removeEmbedded(value: Kooboo.Sites.Models.Style): void;
    removeExternalStyleScript(value: Kooboo.Sites.Models.Style): void;
    clean(value: Kooboo.Sites.Models.Style): void;
    updateEmbedded(Value: Kooboo.Sites.Models.Style, body: string, userId: any): void;
    getExternals(): Kooboo.Sites.Models.Style[];
    getEmbeddeds(Distinct?: boolean): Kooboo.Sites.Models.Style[];
    countSameEmbedded(BodyHash: number): number;
    getSameEmbedded(BodyHash: number): Kooboo.Sites.Models.Style[];
    getByOwnerId(OwnerId: any, OwnerConstType: number): Kooboo.Sites.Models.Style[];
    upload(contentBytes: number[], fullName: string, UserId: any, modelHandler?: (p1:Kooboo.Sites.Models.Style,)=>void): Kooboo.Sites.Models.Style;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Style): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Style, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Style): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Style;
    getFromCache(id: any): Kooboo.Sites.Models.Style;
    get(nameorid: string): Kooboo.Sites.Models.Style;
    getWithEvent(id: any): Kooboo.Sites.Models.Style;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Style;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Style;
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Style[];
    all(): Kooboo.Sites.Models.Style[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Style[];
    isEqual(x: Kooboo.Sites.Models.Style, y: Kooboo.Sites.Models.Style): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Style): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ResourceGroupRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getStyleGroups(): Kooboo.Sites.Models.ResourceGroup[];
    getScriptGroups(): Kooboo.Sites.Models.ResourceGroup[];
    isUniqueName(name: string, consttype: number): boolean;
    getByNameOrId(name: string, consttype?: number): Kooboo.Sites.Models.ResourceGroup;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.ResourceGroup): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ResourceGroup, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ResourceGroup, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ResourceGroup): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.ResourceGroup;
    getFromCache(id: any): Kooboo.Sites.Models.ResourceGroup;
    get(nameorid: string): Kooboo.Sites.Models.ResourceGroup;
    getWithEvent(id: any): Kooboo.Sites.Models.ResourceGroup;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.ResourceGroup;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.ResourceGroup;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.ResourceGroup;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.ResourceGroup[];
    all(): Kooboo.Sites.Models.ResourceGroup[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.ResourceGroup[];
    isEqual(x: Kooboo.Sites.Models.ResourceGroup, y: Kooboo.Sites.Models.ResourceGroup): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.ResourceGroup): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface CmsCssRuleRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(value: Kooboo.Sites.Models.CmsCssRule, UserId?: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CmsCssRule, UserId?: any, updateSource?: boolean): boolean;
    delete(id: any, UserId?: any): number;
    delete(id: any, updateSource?: boolean): number;
    updateInlineCss(CmsCssRuleId: any, RuleText: string): void;
    updateInlineCss(cssrule: Kooboo.Sites.Models.CmsCssRule, RuleText: string): void;
    addInlineCss(ObjectId: any, ObjectType: number, KoobooId: string, RuleText: string): void;
    removeInlineCss(CmsCssRuleId: any): void;
    addNewCssRule(ParentStyleId: any, selector: string, declarationText: string): void;
    addNewCssRule(ParentStyleId: any, cssText: string): void;
    addOrUpdateDeclaration(CmsCssRuleId: any, PropertyName: string, Value: string, Importance?: boolean): void;
    getRuleTextAddOrUpdateDeclaration(CmsCssRuleId: any, PropertyName: string, Value: string, Importance?: boolean): string;
    updateStyle(changelist: Kooboo.Sites.Models.CmsCssRuleChanges[], ParentStyleId: any): void;
    updateDom(changes: Kooboo.Sites.Models.CmsCssRuleChanges[], OwnerObjectId: any, OwnerObjectType: number): void;
    parseChange(cssText: string, changeplans: Kooboo.Sites.Models.ChangePlan[]): string;
    getByStyleId(StyleId: any): Kooboo.Sites.Models.CmsCssRule[];
    getByRuleId(CssRuleId: any): Kooboo.Sites.Models.CmsCssRule[];
    getInLineRules(): Kooboo.Sites.Models.CmsCssRule[];
    showRelations(CssRuleId: any): Kooboo.Data.Models.UsedByRelation[];
    showRelations(cssrule: Kooboo.Sites.Models.CmsCssRule): Kooboo.Data.Models.UsedByRelation[];
    cleanUp(): Kooboo.Sites.Models.CmsCssRule[];
    listUsedByPage(PageId: any): Kooboo.Sites.Models.CmsCssRule[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.CmsCssRule): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CmsCssRule, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.CmsCssRule): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.CmsCssRule;
    getFromCache(id: any): Kooboo.Sites.Models.CmsCssRule;
    get(nameorid: string): Kooboo.Sites.Models.CmsCssRule;
    getWithEvent(id: any): Kooboo.Sites.Models.CmsCssRule;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.CmsCssRule;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.CmsCssRule;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.CmsCssRule;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.CmsCssRule[];
    all(): Kooboo.Sites.Models.CmsCssRule[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.CmsCssRule[];
    isEqual(x: Kooboo.Sites.Models.CmsCssRule, y: Kooboo.Sites.Models.CmsCssRule): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.CmsCssRule): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ExternalResourceRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(FullUrl: string, DestinationObjectType: number): void;
    getByUrl(Url: string): Kooboo.Sites.Models.ExternalResource;
    changeUrl(Id: any, NewUrl: string): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.ExternalResource): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ExternalResource, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ExternalResource, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.ExternalResource): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.ExternalResource;
    getFromCache(id: any): Kooboo.Sites.Models.ExternalResource;
    get(nameorid: string): Kooboo.Sites.Models.ExternalResource;
    getWithEvent(id: any): Kooboo.Sites.Models.ExternalResource;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.ExternalResource;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.ExternalResource;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.ExternalResource[];
    all(): Kooboo.Sites.Models.ExternalResource[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.ExternalResource[];
    isEqual(x: Kooboo.Sites.Models.ExternalResource, y: Kooboo.Sites.Models.ExternalResource): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.ExternalResource): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ThumbnailRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getThumbnail(imageid: any, width: number, height: number): Kooboo.Sites.Models.Thumbnail;
    deleteByImageId(ImageId: any): void;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Thumbnail): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Thumbnail, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Thumbnail, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Thumbnail): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Thumbnail;
    getFromCache(id: any): Kooboo.Sites.Models.Thumbnail;
    get(nameorid: string): Kooboo.Sites.Models.Thumbnail;
    getWithEvent(id: any): Kooboo.Sites.Models.Thumbnail;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Thumbnail;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Thumbnail;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Thumbnail;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Thumbnail[];
    all(): Kooboo.Sites.Models.Thumbnail[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Thumbnail[];
    isEqual(x: Kooboo.Sites.Models.Thumbnail, y: Kooboo.Sites.Models.Thumbnail): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Thumbnail): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface LabelRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    updateLabel(LabelGuid: any, culture: string, Value: string): void;
    getOrAdd(LabelKey: string, DefaultValue: string, DefaultCulture: string): Kooboo.Sites.Contents.Models.Label;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Contents.Models.Label): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.Label, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.Label, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.Label): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Contents.Models.Label;
    getFromCache(id: any): Kooboo.Sites.Contents.Models.Label;
    get(nameorid: string): Kooboo.Sites.Contents.Models.Label;
    getWithEvent(id: any): Kooboo.Sites.Contents.Models.Label;
    getByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.Label;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.Label;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Contents.Models.Label;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Contents.Models.Label[];
    all(): Kooboo.Sites.Contents.Models.Label[];
    list(UseColumnData?: boolean): Kooboo.Sites.Contents.Models.Label[];
    isEqual(x: Kooboo.Sites.Contents.Models.Label, y: Kooboo.Sites.Contents.Models.Label): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Contents.Models.Label): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface kConfigRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getOrAdd(key: string, TagName: string, TagHtml: string): Kooboo.Sites.Models.KConfig;
    getOrAdd(key: string, El: Kooboo.Dom.Element): Kooboo.Sites.Models.KConfig;
    getOrAddOrUpdate(key: string, El: Kooboo.Dom.Element): Kooboo.Sites.Models.KConfig;
    getBindings(El: Kooboo.Dom.Element): Record<string, string>;
    isIgnoreAttribute(name: string): boolean;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.KConfig): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.KConfig, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.KConfig, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.KConfig): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.KConfig;
    getFromCache(id: any): Kooboo.Sites.Models.KConfig;
    get(nameorid: string): Kooboo.Sites.Models.KConfig;
    getWithEvent(id: any): Kooboo.Sites.Models.KConfig;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.KConfig;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.KConfig;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.KConfig;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.KConfig[];
    all(): Kooboo.Sites.Models.KConfig[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.KConfig[];
    isEqual(x: Kooboo.Sites.Models.KConfig, y: Kooboo.Sites.Models.KConfig): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.KConfig): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface HtmlBlockRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    addOrUpdate(name: string, values: Record<string, string>, HtmlBlockId?: any): void;
    get(nameOrId: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    getOrAdd(blockName: string, DefaultValue: string, DefaultCulture: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Contents.Models.HtmlBlock): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.HtmlBlock, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.HtmlBlock, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.HtmlBlock): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Contents.Models.HtmlBlock;
    getFromCache(id: any): Kooboo.Sites.Contents.Models.HtmlBlock;
    get(nameorid: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    getWithEvent(id: any): Kooboo.Sites.Contents.Models.HtmlBlock;
    getByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Contents.Models.HtmlBlock;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Contents.Models.HtmlBlock[];
    all(): Kooboo.Sites.Contents.Models.HtmlBlock[];
    list(UseColumnData?: boolean): Kooboo.Sites.Contents.Models.HtmlBlock[];
    isEqual(x: Kooboo.Sites.Contents.Models.HtmlBlock, y: Kooboo.Sites.Contents.Models.HtmlBlock): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Contents.Models.HtmlBlock): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ContentFolderRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getColumns(folder: Kooboo.Sites.Contents.Models.ContentFolder): Kooboo.Sites.Contents.Models.ContentProperty[];
    getColumn(folder: Kooboo.Sites.Contents.Models.ContentFolder, columnName: string): Kooboo.Sites.Contents.Models.ContentProperty;
    getByName(FolderName: string): Kooboo.Sites.Contents.Models.ContentFolder;
    isFolderNameExists(FolderName: string): boolean;
    isTreeStyleFolder(folder: Kooboo.Sites.Contents.Models.ContentFolder): boolean;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getViewDataMethods(methodId: any): Kooboo.Sites.Models.ViewDataMethod[];
    cleanRelation(input: Kooboo.Sites.Relation.ObjectRelation[]): Kooboo.Sites.Relation.ObjectRelation[];
    getEmbeddedBy(FolderId: any): Kooboo.Sites.ViewModel.EmbeddedBy[];
    init(): void;
    isEqualTo(value: Kooboo.Sites.Contents.Models.ContentFolder): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentFolder, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentFolder, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentFolder): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Contents.Models.ContentFolder;
    getFromCache(id: any): Kooboo.Sites.Contents.Models.ContentFolder;
    get(nameorid: string): Kooboo.Sites.Contents.Models.ContentFolder;
    getWithEvent(id: any): Kooboo.Sites.Contents.Models.ContentFolder;
    getByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.ContentFolder;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.ContentFolder;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Contents.Models.ContentFolder;
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Contents.Models.ContentFolder[];
    all(): Kooboo.Sites.Contents.Models.ContentFolder[];
    list(UseColumnData?: boolean): Kooboo.Sites.Contents.Models.ContentFolder[];
    isEqual(x: Kooboo.Sites.Contents.Models.ContentFolder, y: Kooboo.Sites.Contents.Models.ContentFolder): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Contents.Models.ContentFolder): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ContentTypeRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getColumns(ContentTypeId: any): Kooboo.Sites.Contents.Models.ContentProperty[];
    getPropertiesByFolder(FolderId: any): Kooboo.Sites.Contents.Models.ContentProperty[];
    getTitlePropertyByFolder(FolderId: any): Kooboo.Sites.Contents.Models.ContentProperty[];
    getTitlePropertyByContentType(ContentTypeId: any): Kooboo.Sites.Contents.Models.ContentProperty[];
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentType): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentType, UserId: any): boolean;
    ensureSystemFields(contentType: Kooboo.Sites.Contents.Models.ContentType): void;
    isNameExists(contentTypeName: string): boolean;
    getTitleColumns(contentTypeId: any): string[];
    getByFolder(FolderId: any): Kooboo.Sites.Contents.Models.ContentType;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Contents.Models.ContentType): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentType, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Contents.Models.ContentType;
    getFromCache(id: any): Kooboo.Sites.Contents.Models.ContentType;
    get(nameorid: string): Kooboo.Sites.Contents.Models.ContentType;
    getWithEvent(id: any): Kooboo.Sites.Contents.Models.ContentType;
    getByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.ContentType;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.ContentType;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Contents.Models.ContentType;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Contents.Models.ContentType[];
    all(): Kooboo.Sites.Contents.Models.ContentType[];
    list(UseColumnData?: boolean): Kooboo.Sites.Contents.Models.ContentType[];
    isEqual(x: Kooboo.Sites.Contents.Models.ContentType, y: Kooboo.Sites.Contents.Models.ContentType): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Contents.Models.ContentType): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ContentCategoryRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getCategories(folderId: any, contentId: any): Kooboo.Sites.Contents.Models.ContentCategory[];
    fastGetCategories(CategoryFolderId: any, contentId: any): Kooboo.Sites.Contents.Models.ContentCategory[];
    updateCategory(ContentId: any, FolderId: any, CategoryIds: any[], UserId: any): void;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentCategory): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentCategory, UserId: any): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Contents.Models.ContentCategory): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.ContentCategory, UserId: any, betweenEvent: ()=>void): boolean;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Contents.Models.ContentCategory;
    getFromCache(id: any): Kooboo.Sites.Contents.Models.ContentCategory;
    get(nameorid: string): Kooboo.Sites.Contents.Models.ContentCategory;
    getWithEvent(id: any): Kooboo.Sites.Contents.Models.ContentCategory;
    getByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.ContentCategory;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.ContentCategory;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Contents.Models.ContentCategory;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Contents.Models.ContentCategory[];
    all(): Kooboo.Sites.Contents.Models.ContentCategory[];
    list(UseColumnData?: boolean): Kooboo.Sites.Contents.Models.ContentCategory[];
    isEqual(x: Kooboo.Sites.Contents.Models.ContentCategory, y: Kooboo.Sites.Contents.Models.ContentCategory): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Contents.Models.ContentCategory): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface TextContentRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Contents.Models.TextContent;
    ensureUserKey(content: Kooboo.Sites.Contents.Models.TextContent): void;
    getView(id: any, lang: string): Kooboo.Sites.ViewModel.TextContentViewModel;
    getView(content: Kooboo.Sites.Contents.Models.TextContent, lang: string): Kooboo.Sites.ViewModel.TextContentViewModel;
    getDefaultContentFromFolder(FolderId: any, CurrentCulture?: string): Kooboo.Sites.ViewModel.TextContentViewModel;
    generateUserKey(content: Kooboo.Sites.Contents.Models.TextContent): string;
    getSortedTextContentsByFolder(folder: Kooboo.Sites.Contents.Models.ContentFolder, includeOfflineData: boolean, sortField?: string, ascending?: boolean, categories?: Record<any, any>): Kooboo.Sites.Contents.Models.TextContent[];
    sortTextContentsByFolder(textContents: Kooboo.Sites.Contents.Models.TextContent[], folder: Kooboo.Sites.Contents.Models.ContentFolder): Kooboo.Sites.Contents.Models.TextContent[];
    eusureNonLangContent(content: Kooboo.Sites.Contents.Models.TextContent, contenttype?: Kooboo.Sites.Contents.Models.ContentType): void;
    delete(id: any, UserId: any): number;
    addOrUpdate(textContent: Kooboo.Sites.Contents.Models.TextContent, UserId?: any): boolean;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Contents.Models.TextContent): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.TextContent, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Contents.Models.TextContent): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Contents.Models.TextContent;
    getFromCache(id: any): Kooboo.Sites.Contents.Models.TextContent;
    get(nameorid: string): Kooboo.Sites.Contents.Models.TextContent;
    getWithEvent(id: any): Kooboo.Sites.Contents.Models.TextContent;
    getByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.TextContent;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Contents.Models.TextContent;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Contents.Models.TextContent[];
    all(): Kooboo.Sites.Contents.Models.TextContent[];
    list(UseColumnData?: boolean): Kooboo.Sites.Contents.Models.TextContent[];
    isEqual(x: Kooboo.Sites.Contents.Models.TextContent, y: Kooboo.Sites.Contents.Models.TextContent): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Contents.Models.TextContent): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface AuthenticationRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.Authentication): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Authentication, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Authentication, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.Authentication): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.Authentication;
    getFromCache(id: any): Kooboo.Sites.Models.Authentication;
    get(nameorid: string): Kooboo.Sites.Models.Authentication;
    getWithEvent(id: any): Kooboo.Sites.Models.Authentication;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.Authentication;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.Authentication;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.Authentication;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.Authentication[];
    all(): Kooboo.Sites.Models.Authentication[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.Authentication[];
    isEqual(x: Kooboo.Sites.Models.Authentication, y: Kooboo.Sites.Models.Authentication): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.Authentication): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface OpenApiRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.OpenApi): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.OpenApi, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.OpenApi, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.OpenApi): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.OpenApi;
    getFromCache(id: any): Kooboo.Sites.Models.OpenApi;
    get(nameorid: string): Kooboo.Sites.Models.OpenApi;
    getWithEvent(id: any): Kooboo.Sites.Models.OpenApi;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.OpenApi;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.OpenApi;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.OpenApi;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.OpenApi[];
    all(): Kooboo.Sites.Models.OpenApi[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.OpenApi[];
    isEqual(x: Kooboo.Sites.Models.OpenApi, y: Kooboo.Sites.Models.OpenApi): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.OpenApi): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface JobRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.SiteJob): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteJob, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteJob, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SiteJob): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.SiteJob;
    getFromCache(id: any): Kooboo.Sites.Models.SiteJob;
    get(nameorid: string): Kooboo.Sites.Models.SiteJob;
    getWithEvent(id: any): Kooboo.Sites.Models.SiteJob;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.SiteJob;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.SiteJob;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.SiteJob;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.SiteJob[];
    all(): Kooboo.Sites.Models.SiteJob[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.SiteJob[];
    isEqual(x: Kooboo.Sites.Models.SiteJob, y: Kooboo.Sites.Models.SiteJob): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.SiteJob): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface UserOptionsRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.UserOptions): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.UserOptions, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.UserOptions, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.UserOptions): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.UserOptions;
    getFromCache(id: any): Kooboo.Sites.Models.UserOptions;
    get(nameorid: string): Kooboo.Sites.Models.UserOptions;
    getWithEvent(id: any): Kooboo.Sites.Models.UserOptions;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.UserOptions;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.UserOptions;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.UserOptions;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.UserOptions[];
    all(): Kooboo.Sites.Models.UserOptions[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.UserOptions[];
    isEqual(x: Kooboo.Sites.Models.UserOptions, y: Kooboo.Sites.Models.UserOptions): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.UserOptions): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface SpaMultilingualRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.SpaMultilingual): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SpaMultilingual, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SpaMultilingual, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.SpaMultilingual): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.SpaMultilingual;
    getFromCache(id: any): Kooboo.Sites.Models.SpaMultilingual;
    get(nameorid: string): Kooboo.Sites.Models.SpaMultilingual;
    getWithEvent(id: any): Kooboo.Sites.Models.SpaMultilingual;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.SpaMultilingual;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.SpaMultilingual;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.SpaMultilingual;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.SpaMultilingual[];
    all(): Kooboo.Sites.Models.SpaMultilingual[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.SpaMultilingual[];
    isEqual(x: Kooboo.Sites.Models.SpaMultilingual, y: Kooboo.Sites.Models.SpaMultilingual): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.SpaMultilingual): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface OpenApiAuthorizeRepository extends ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: Kooboo.Sites.Models.OpenApiAuthorize): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.OpenApiAuthorize, UserId: any): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.OpenApiAuthorize, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: Kooboo.Sites.Models.OpenApiAuthorize): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): Kooboo.Sites.Models.OpenApiAuthorize;
    getFromCache(id: any): Kooboo.Sites.Models.OpenApiAuthorize;
    get(nameorid: string): Kooboo.Sites.Models.OpenApiAuthorize;
    getWithEvent(id: any): Kooboo.Sites.Models.OpenApiAuthorize;
    getByUrl(relativeUrl: string): Kooboo.Sites.Models.OpenApiAuthorize;
    getMetaByUrl(relativeUrl: string): Kooboo.Sites.Models.OpenApiAuthorize;
    getByNameOrId(NameOrGuid: string): Kooboo.Sites.Models.OpenApiAuthorize;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): Kooboo.Sites.Models.OpenApiAuthorize[];
    all(): Kooboo.Sites.Models.OpenApiAuthorize[];
    list(UseColumnData?: boolean): Kooboo.Sites.Models.OpenApiAuthorize[];
    isEqual(x: Kooboo.Sites.Models.OpenApiAuthorize, y: Kooboo.Sites.Models.OpenApiAuthorize): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: Kooboo.Sites.Models.OpenApiAuthorize): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface ISiteRepositoryBase {
    siteDb: SiteDb;
    init(): void;
    rebuild(): void;
  }

  interface HistoryItem {
    domain: string;
    relativeToRoot: string;
    headless: boolean;
  }

  interface DownloadingTask {
    startTime: Date;
    isCompleted: boolean;
  }

  interface IEmbeddableRepository {
    getSameEmbedded(BodyHash: number): any[];
  }

  interface SearchLog {
    time: Date;
    iP: string;
    keywords: string;
    resultCount: number;
    skip: number;
    docFound: number;
  }

}
declare namespace Kooboo.Data.Definition {
  type WebsiteType = 'p' | 'o' | 'm' | 'u';

  type DefaultDatabase = 'Auto' | 'Sqlite' | 'Mysql' | 'SqlServer';

  type DataTypes = 'Undefined' | 'String' | 'Number' | 'Decimal' | 'DateTime' | 'Bool' | 'Guid' | 'Array';

}
declare namespace Kooboo.Data.Pwa {
  interface PwaSettings {
    enable: boolean;
    manifest: string;
    serviceWorker: string;
    getDefault(name: string): PwaSettings;
  }

}
declare namespace Kooboo.Data.Models.AI {
  interface AISettings {
    mcpServer: McpServerOptions;
    vectorSearch: VectorSearchOptions;
  }

  interface McpServerOptions {
    enable: boolean;
    stateless: boolean;
    disableBuiltInTools: boolean;
  }

  interface VectorSearchOptions {
    enable: boolean;
    provider: string;
    model: string;
  }

}
declare namespace Kooboo.Data.Logging {
  interface CodeLogSettings {
    enable: boolean;
    logLevel: Kooboo.Logging.LogLevel;
    keepDays: number;
  }

  type ColorScheme = 'Unknown' | 'Light' | 'Dark';

  interface CodeLog extends Kooboo.Data.Storage.IWeeklyItem {
    message: string;
    level: string;
    category: string;
    traceId: string;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    name: string;
    id: number;
  }

}
declare namespace Kooboo.Data.Unocss {
  interface UnocssSettings {
    enable: boolean;
    disableSsr: boolean;
    resetStyle: boolean;
    config: string;
  }

}
declare namespace Kooboo.Data.RateLimits {
  interface RateLimitSettings {
    enable: boolean;
    limitAllRequest: boolean;
    allRequestRateSettings: RateSettings;
    ipLimits: Record<string, RateSettings>;
    userAgentLimits: Record<string, RateSettings>;
  }

  interface AccessLimitSettings {
    enable: boolean;
    ipBlacklist: string[];
    blockUserAgentKeywords: string[];
  }

  interface RateSettings {
    permitLimit: number;
    withinSeconds: number;
  }

}
  declare interface VersionCompareViewModel {
    title1: string;
    title2: string;
    objectId: any;
    constType: number;
    id1: number;
    id2: number;
    source1: string;
    source2: string;
    dataType: VersionDataType;
  }

  declare type VersionDataType = 'String' | 'Image';

  declare interface ReadSpanAction extends Function {
    target?: any;
    method: any;
    invoke(span: any): void;
    beginInvoke(span: any, callback: any, object: any): any;
    endInvoke(result: any): void;
    getObjectData(info: any, context: any): void;
    getInvocationList(): any[];
    clone(): any;
    dynamicInvoke(args: any[]): any;
  }

declare namespace Kooboo.Sites.Service {
  interface ResourceCount {
    name: string;
    count: number;
    share: number;
    size: number;
    sizeString: string;
  }

}
declare namespace Kooboo.Sites.Contents.Models {
  interface HtmlBlock extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IDynamic, Kooboo.Sites.Models.IDomObject, Kooboo.Data.Interface.ITextObject, MultipleLanguageObject {
    body: string;
    dom: Kooboo.Dom.Document;
    values: Record<string, any>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface Label extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IDynamic, MultipleLanguageObject {
    values: Record<string, any>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface ContentProperty {
    name: string;
    displayName: string;
    controlType: string;
    dataType: Kooboo.Data.Definition.DataTypes;
    isSummaryField: boolean;
    multipleLanguage: boolean;
    editable: boolean;
    order: number;
    tooltip: string;
    maxLength: number;
    validations: string;
    isSystemField: boolean;
    displayInSearchResult: boolean;
    multipleValue: boolean;
    selectionOptions: string;
    settings: string;
    isMedia(): boolean;
  }

  interface MultipleLanguageObject extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Data.Interface.IDynamic, Kooboo.Sites.Models.CoreObject {
    values: Record<string, any>;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface ContentFolder extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.CoreObject {
    parentFolderId: any;
    displayName: string;
    contentTypeId: any;
    embedded: EmbeddedFolder[];
    category: CategoryFolder[];
    sortable: boolean;
    sortField: string;
    ascending: boolean;
    hidden: boolean;
    pageSize: number;
    isContent: boolean;
    order: number;
    fieldsOrder: string[];
    group: string;
    previewUrl: string;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

  interface ContentType extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.CoreObject {
    isNested: boolean;
    properties: ContentProperty[];
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    getProperty(propertyName: string): ContentProperty;
    clone(): any;
  }

  interface ContentCategory extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.CoreObject {
    id: any;
    categoryFolder: any;
    categoryId: any;
    contentId: any;
    order: number;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface TextContent extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.IDomObject, Kooboo.Data.Interface.ITextObject, Kooboo.Sites.Models.CoreObject {
    name: string;
    id: any;
    userKey: string;
    folderId: any;
    parentId: any;
    contentTypeId: any;
    order: number;
    dragAndDrop: number;
    summaryText: string;
    embedded: Record<any, any>;
    contents: MultilingualContent[];
    dom: Kooboo.Dom.Document;
    body: string;
    enableAvailableDate: boolean;
    availableStartDate: Date;
    availableEndDate: Date;
    offlineCultures: string[];
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    onAvailableDate(): boolean;
    getValue(FieldName: string, Lang?: string): any;
    setValue(FieldName: string, Value: string, Lang?: string): void;
    deepCopy(): TextContent;
    clone(): any;
  }

  interface EmbeddedFolder {
    alias: string;
    folderId: any;
    display: string;
    group: string;
  }

  interface CategoryFolder {
    alias: string;
    display: string;
    folderId: any;
    multiple: boolean;
  }

  interface MultilingualContent {
    lang: string;
    fieldValues: Record<string, string>;
    clone(): MultilingualContent;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Api.Meta {
  interface MetaBase {
    name: string;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        required: true
    }
])
```
 */
    required?: boolean;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number'
    }
])
```
 */
    type?: KScript.Api.Types;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number', // if type == 'String' match string length
        min: 30
    }
])
```
 */
    min?: number;
    /** ```ts
//GET /test?id=23
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        type: 'Number', // if type == 'String' match string length
        max: 30
    }
])
```
 */
    max?: number;
    /** ```ts
//GET /test?id=bee
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        pattern: 'be+'
    }
])
```
 */
    pattern?: string;
    /** ```ts
//GET /test?id=bee
k.api.get(function (id) {
    return id;
}, [
    {
        name: 'id',
        validator: function (value) {
            return value == 'bee'
        }
    }
])
```
 */
    validator?: Function;
    /** ```ts
//POST /test
// {
//     'age':23
// }

k.api.post(function (body) {
    return body;
}, [
    {
        name: 'body',
        from: 'Body',
        children: [
            {
                name: 'age',
                min: 10
            }
        ]
    }
])
```
 */
    children?: KScript.Api.ChildMeta[];
  }

}
declare namespace Kooboo.Data.Models.Converter {
  interface AppendText {
    text: string;
    location: Location;
    color: Color;
  }

  interface Location {
    x: number;
    y: number;
    align: string;
  }

  interface Color {
    r: number;
    g: number;
    b: number;
  }

}
declare namespace Kooboo.Lib.Utilities {
  interface SizeMeasurement {
    height: number;
    width: number;
  }

}
declare namespace FirebaseAdmin.Auth {
  interface UserRecordArgs {
    uid: string;
    email: string;
    phoneNumber: string;
    displayName: string;
    emailVerified: boolean;
    photoUrl: string;
    disabled: boolean;
    password: string;
  }

  interface UserRecord extends IUserInfo {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    providerId: string;
    emailVerified: boolean;
    disabled: boolean;
    providerData: IUserInfo[];
    tokensValidAfterTimestamp: Date;
    userMetaData: UserMetadata;
    customClaims: any;
    tenantId: string;
  }

  interface ActionCodeSettings {
    url: string;
    handleCodeInApp: boolean;
    dynamicLinkDomain: string;
    iosBundleId: string;
    androidPackageName: string;
    androidMinimumVersion: string;
    androidInstallApp: boolean;
  }

  interface IUserInfo {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    providerId: string;
  }

  interface UserMetadata {
    creationTimestamp?: Date;
    lastSignInTimestamp?: Date;
    lastRefreshTimestamp?: Date;
  }

}
declare namespace Kooboo.Mail {
  interface Message extends IMailObject, Kooboo.IndexedDB.WORM.MetaObject.IMetaObject {
    maildb: MailDb;
    id: number;
    msgId: number;
    smtpMessageId: string;
    userId: any;
    addressId: number;
    outGoing: boolean;
    folderId: number;
    mailFrom: string;
    rcptTo: string;
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    bodyPosition: number;
    body: string;
    summary: string;
    size: number;
    read: boolean;
    answered: boolean;
    deleted: boolean;
    flagged: boolean;
    recent: boolean;
    creationTime: Date;
    creationTimeTick: number;
    date: Date;
    draft: boolean;
    attachments: Kooboo.Mail.Models.Attachment[];
    hasAttachment: boolean;
    inviteConfirm: number;
    clone(): Message;
    getFlags(): string[];
    addFlags(flags: string[]): void;
    replaceFlags(flags: string[]): void;
    removeFlags(flags: string[]): void;
  }

  interface MailDb {
    msgFolder: string;
    organizationId: any;
    userId: any;
    db: Kooboo.IndexedDB.Database;
    folder: Kooboo.Mail.Repositories.Sqlite.FolderRepo;
    addBook: Kooboo.Mail.Repositories.Sqlite.AddressBookRepo;
    smtpDelivery: Kooboo.Mail.Repositories.Sqlite.SmtpReportRepo;
    message2: Kooboo.Mail.Repositories.Sqlite.MessageRepo;
    calendar: Kooboo.Mail.Repositories.Sqlite.CalendarRepo;
    mailMigrationJob: Kooboo.Mail.Repositories.Sqlite.MailMigrationJobRepo;
    mailMigrationProgress: Kooboo.Mail.Repositories.Sqlite.MailMigrationProgressRepo;
    msgBody2: any;
    msgHandler: MsgHandler;
    sqliteHelper: SqlLiteHelper;
    dispose(): void;
    initMailDb(sqlLiteHelper: SqlLiteHelper): void;
    importmsg(): void;
  }

  interface IMailObject {
    id: number;
  }

  interface SqlLiteHelper {
    keepConnectionAlive: boolean;
    uTCStartdate: Date;
    getConnection(): any;
    query(sql: string): any[];
    queryAsync(sql: string): any;
    queryFirstOrDefault(Sql: string): any;
    queryFirstOrDefaultAsync(Sql: string): any;
    execute(Sql: string): void;
    executeAsync(Sql: string): any;
    executeScalar(Sql: string): any;
    executeScalarAsync(Sql: string): any;
    beginTransaction(): void;
    commit(): void;
    closeActiveConnection(): void;
    getColumns(tableName: string): SqliteColumn[];
    getTables(): string[];
    update(TableName: string, KeyName: string, Id: any, Values: Record<string, any>): void;
    update(value: any, tableName: string, keyname: string): void;
    insert(TableName: string, Values: Record<string, any>): void;
    objToString(obj: any): string;
    add(Value: any, tableName: string): void;
    addGetId(Value: any, tableName: string, IDColName: string): number;
    addOrUpdate(value: any, TableName: string, keyName: string): boolean;
    addOrUpdate(Id: any, TableName: string, KeyName: string, values: Record<string, any>): boolean;
    delete(TableName: string, KeyName: string, id: any): void;
    get(TableName: string, KeyName: string, Id: any): any;
    get(TableName: string, criteria: Record<string, any>): any;
    getAsync(TableName: string, KeyName: string, Id: any): any;
    findAll(tableName: string, FieldName: string, CompareValue: any): any[];
    find(tableName: string, FieldName: string, CompareValue: any): any;
    all(tableName: string): any[];
    get(sql: string): any;
    getAsync(sql: string): any;
    where(TableName: string): any;
    getInsertSql(value: any, TableName: string, keyName: string): string;
    getUpdateSql(value: any, TableName: string, keyName: string): string;
    changeType(value: any, ConversionType: any): any;
  }

  interface MsgHandler {
    _maildb: MailDb;
    getMsgFileName(MsgId: number, BodyPosition: number): string;
    getMsgBody(MsgId: number, BodyPosition: number): string;
    getRawMsgBody(MsgId: number, BodyPosition: number): MimeKit.MimeMessage;
    setMsgBody(MsgId: number, body: string): void;
    setMsgBody(MsgId: number, body: MimeKit.MimeMessage): void;
    deleteMsg(MsgId: number): void;
  }

  interface SqliteColumn {
    name: string;
    type: string;
    pk: boolean;
    incremental: boolean;
  }

  interface Folder extends IMailObject {
    reservedFolder: Record<number, string>;
    id: number;
    name: string;
    subscribed: boolean;
    toId(name: string): number;
  }

}
declare namespace Kooboo.Mail.Models {
  interface MailModule {
    id: any;
    name: string;
    settings: string;
    taskJs: string;
    online: boolean;
  }

  interface SmtpSetting {
    server: string;
    port: number;
    sSL: boolean;
    from: string;
    userName: string;
    password: string;
  }

  interface Attachment {
    fileName: string;
    type: string;
    subType: string;
    size: number;
    loadFromMimeMessage(msg: MimeKit.MimeMessage): Attachment[];
  }

  interface AddressBook extends Kooboo.Mail.IMailObject {
    id: number;
    userId: any;
    fullAddress: string;
    address: string;
    name: string;
  }

  interface SmtpReport {
    id: any;
    isSuccess: boolean;
    log: string;
    messageId: string;
    headerFrom: string;
    rcptTo: string;
    dateTick: number;
    subject: string;
    json: string;
    toGuid(messageid: string): any;
  }

  interface SmtpReportIn {
    isSuccess: boolean;
    log: string;
    messageId: string;
    headerFrom: string;
    rcptTo: string;
    dateTick: number;
    subject: string;
  }

  interface MessageStat {
    exists: number;
    recent: number;
    seen: number;
    unSeen: number;
    firstUnSeen: number;
    nextUid: number;
    folderUid: number;
    uIDVALIDITY: number;
    lastestMsgId: number;
  }

  interface UnreadCounter {
    addressId: number;
    exists: number;
    read: number;
    unRead: number;
  }

  interface CalendarInfo {
    id: string;
    calendarTitle: string;
    organizer: string;
    start: Date;
    end: Date;
    attendees: AttendeeModel[];
    location: string;
    mark: string;
    userId: string;
    status: number;
  }

  interface MailMigrationJob extends MailJob {
    emailAddress: string;
    host: string;
    forceSSL: boolean;
    port: number;
    password: string;
    addressId: number;
    id: any;
    name: string;
    startTime: Date;
    active: boolean;
    status: MailMigrationStatus;
    errorMessage: string;
    userId: any;
    organizationId: any;
    creationDate: Date;
    lastModified: Date;
    success(): void;
    failure(error: string): void;
    running(): void;
  }

  interface MailMigrationProgress {
    id: any;
    jobId: any;
    folderId: number;
    addressId: number;
    startIndex: number;
    total: number;
    completed: number;
    errorMessage: string;
    status: MailMigrationStatus;
    submit(startIndex: number): void;
    success(): void;
    failure(error: string): void;
    running(): void;
  }

  interface AttendeeModel {
    value: any;
    type: string;
    role: string;
    commonName: string;
    rsvp: boolean;
    participationStatus: string;
  }

  type MailMigrationStatus = 'Unknown' | 'Success' | 'Failure' | 'Running';

  interface MailJob {
    id: any;
    name: string;
    startTime: Date;
    active: boolean;
    status: MailMigrationStatus;
    errorMessage: string;
    userId: any;
    organizationId: any;
    creationDate: Date;
    lastModified: Date;
    success(): void;
    failure(error: string): void;
    running(): void;
  }

}
declare namespace Kooboo.Mail.Extension {
  interface MailModuleContext {
    message: Kooboo.Mail.Message;
    event: Kooboo.Mail.Events.EnumMailEvent;
    mailDb: Kooboo.Mail.MailDb;
    module: Kooboo.Mail.Models.MailModule;
    renderContext: Kooboo.Data.Context.RenderContext;
    executingView: string;
    rootFolder: string;
    culture: string;
    getBaseUrl(): string;
    fromRenderContext(context: Kooboo.Data.Context.RenderContext, module: Kooboo.Mail.Models.MailModule): MailModuleContext;
    createNewFromRenderContext(context: Kooboo.Data.Context.RenderContext, module: Kooboo.Mail.Models.MailModule): MailModuleContext;
    makeModuleUrl(moduleRelativeUrl: string): string;
  }

}
declare namespace Kooboo.Sites.Commerce.Entities {
  interface Category extends Kooboo.Sites.Commerce.Entity {
    title: string;
    description: string;
    active: boolean;
    seoName: string;
    image: string;
    imageMeta: string;
    type: Kooboo.Sites.Commerce.FilterType;
    condition: Kooboo.Sites.Commerce.Condition.Define;
    parentId: string;
    tags: string[];
    dragAndDrop: number;
    customData: Record<string, MultilingualValue>;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface Product extends Kooboo.Sites.Commerce.Entity {
    title: string;
    description: string;
    attributes: any[];
    active: boolean;
    seoName: string;
    featuredImage: string;
    images: string[];
    imageMetas: string;
    tags: string[];
    isDigital: boolean;
    maxDownloadCount?: number;
    maxDownloadDay?: number;
    variantOptions: VariantOption[];
    customData: Record<string, MultilingualValue>;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    getCustomData(key: string, culture: string): any;
    deepCopy(): Product;
    clone(): any;
    getGuid(): any;
  }

  interface Cart extends Kooboo.Sites.Commerce.Entity {
    traceId: string;
    customerId: string;
    contact: string;
    country: string;
    discountCodes: string[];
    note: string;
    lines: Line[];
    extensionButton: ExtensionButton;
    shippingId: string;
    digitalShippingId: string;
    insuranceAmount: number;
    redeemPoints: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface Address {
    id: string;
    isDefault: boolean;
    address1: string;
    address2: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    zip: string;
  }

  interface Customer extends Kooboo.Sites.Commerce.Entity {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    lastPlaceOrderDate?: Date;
    addresses: Address[];
    tags: string[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface Membership extends Kooboo.Sites.Commerce.Entity {
    name: string;
    description: string;
    price: number;
    durationUnit: Kooboo.Data.Models.DurationUnit;
    duration: number;
    priority: number;
    condition: Kooboo.Sites.Commerce.Condition.Define;
    allowPurchase: boolean;
    allowAutoUpgrade: boolean;
    customData: KScript.KeyValue[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface Discount extends Kooboo.Sites.Commerce.Entity {
    title: string;
    startDate: Date;
    endDate: Date;
    condition: Kooboo.Sites.Commerce.Condition.Define;
    method: Kooboo.Sites.Commerce.DiscountMethod;
    code: string;
    codeUsageLimit?: number;
    type: Kooboo.Sites.Commerce.DiscountType;
    value: number;
    isPercent: boolean;
    priority: number;
    isExclusion: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface DigitalShipping extends Kooboo.Sites.Commerce.Entity {
    name: string;
    description: string;
    mailServerType: string;
    koobooEmailAddress: string;
    customMailServer: Kooboo.Mail.Models.SmtpSetting;
    mailTemplate: Kooboo.Sites.Commerce.ViewModels.ShippingMail;
    isDefault: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clone(): any;
    getGuid(): any;
  }

  interface CurrencyConfig {
    code: string;
    symbol: string;
    exchangeRate: number;
    autoUpdate: boolean;
  }

  interface ExtensionField {
    name: string;
    displayName: string;
    isSummaryField: boolean;
    width: number;
    type: string;
    editable: boolean;
    exportable: boolean;
    exportByCode: boolean;
    exportCode: string;
    filterable: boolean;
    isSelection: boolean;
  }

  interface Currency {
    code: string;
    symbol: string;
    rate: number;
  }

  interface VariantOption extends VariantOptionItem {
    items: VariantOptionItem[];
    name: string;
    type: string;
    multilingual: Kooboo.Sites.Commerce.CustomData.MultilingualValue;
    image: string;
  }

  interface Option {
    name: string;
    value: string;
  }

  interface ExtensionButton {
    text: string;
    url: string;
  }

  interface Line {
    quantity: number;
    variantId: string;
    groupName: string;
    isMain: boolean;
    note: string;
    extensionButton: ExtensionButton;
  }

  interface Shipping extends Kooboo.Sites.Commerce.Entity {
    name: string;
    description: string;
    baseCost: number;
    isDefault: boolean;
    countries: SupportCountry[];
    trackingNumberMatching: string;
    code: string;
    additionalCosts: AdditionalCost[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    applyRate(rate: number): Shipping;
    clone(): any;
    getGuid(): any;
  }

  interface OrderLine {
    id: string;
    totalAmount: number;
    taxAmount: number;
    originalAmount: number;
    quantity: number;
    totalQuantity: number;
    price: number;
    originalPrice: number;
    title: string;
    image: string;
    productId: string;
    variantId: string;
    sku: string;
    orderId: string;
    options: Option[];
    discountAllocations: Kooboo.Sites.Commerce.Calculate.DiscountAllocation[];
    groupName: string;
    isMain: boolean;
    note: string;
    extensionButton: ExtensionButton;
    trackingNumber: string;
    shippingCarrier: string;
    shippingAt?: Date;
    delivered: boolean;
    digitalItems: DigitalOrderItem[];
    autoDelivery: boolean;
    isDigital: boolean;
    maxDownloadCount?: number;
    maxDownloadDay?: number;
    errorMessage: string;
  }

  interface DigitalOrderItem extends DigitalItem {
    downloadCount: number;
    url: string;
    /** 'file' 'text' 'link' */
    type: string;
    name: string;
    value: string;
  }

  interface AdditionalCost {
    cost: number;
    description: string;
    condition: Kooboo.Sites.Commerce.Condition.Define;
    applyRate(rate: number): AdditionalCost;
  }

  interface SupportCountry {
    name: string;
    display: string;
    estimatedDaysOfArrival: number;
  }

  interface DigitalItem {
    /** 'file' 'text' 'link' */
    type: string;
    name: string;
    value: string;
  }

  interface VariantOptionItem {
    name: string;
    type: string;
    multilingual: Kooboo.Sites.Commerce.CustomData.MultilingualValue;
    image: string;
  }

}
declare namespace Kooboo.Sites.Commerce.DataStorage {
  interface ProductReviewModel {
    customerId: string;
    productId: string;
    variantId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }

  interface CustomerOAuthModel {
    customerId: string;
    openId: string;
    type: string;
    createdAt: Date;
  }

  interface WishlistModel {
    customerId: string;
    productId: string;
    variantId: string;
    getHashGuid(): any;
  }

  interface CustomerPointModel {
    customerId: string;
    points: number;
    createdAt: Date;
    type: ChangeType;
    description: string;
    key: string;
    disabled: boolean;
  }

  type ChangeType = 'OrderEarn' | 'OrderRedeem' | 'ManualEarn' | 'ManualRedeem' | 'LoginEarn';

}
declare namespace Kooboo.Sites.Commerce.ViewModels {
  interface OrderDetail {
    id: string;
    customer: CustomerInfo;
    pointsDeductionAmount: number;
    earnPoints: number;
    redeemPoints: number;
    totalAmount: number;
    taxAmount: number;
    originalAmount: number;
    shippingAmount: number;
    insuranceAmount?: number;
    subtotalAmount: number;
    originalSubtotalAmount: number;
    totalQuantity: number;
    currency: string;
    paid: boolean;
    paidAt?: Date;
    paymentMethod: string;
    delivered: boolean;
    partialDelivered: boolean;
    trackingNumber: string;
    shippingCarrier: string;
    shippingAt?: Date;
    scheduledDeliveryTime?: Date;
    canceled: boolean;
    cancelReason: string;
    cancelAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    shippingAddress: Kooboo.Sites.Commerce.Entities.Address;
    note: string;
    lines: Kooboo.Sites.Commerce.Entities.OrderLine[];
    ip: string;
    country: string;
    source: string;
    clientInfo: Kooboo.Lib.Utilities.UAParser.ClientInfo;
    extensionButton: Kooboo.Sites.Commerce.Entities.ExtensionButton;
    discountAllocations: Kooboo.Sites.Commerce.Calculate.DiscountAllocation[];
    shippingAllocations: Kooboo.Sites.Commerce.Calculate.ShippingAllocation[];
    extensionFields: KScript.KeyValue[];
  }

  interface DeliveryOptions {
    shippingCarrier: string;
    trackingNumber: string;
    digitalItems: Kooboo.Sites.Commerce.Entities.DigitalOrderItem[];
  }

  interface PagingQuery {
    pageIndex: number;
    pageSize: number;
  }

  interface CustomerInfo {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }

  interface ShippingMail {
    subject: string;
    body: string;
    default(): ShippingMail;
  }

}
declare namespace Kooboo.Sites.Commerce.RewardPoints {
  interface EarnPointSettings {
    activeDurationUnit: Kooboo.Data.Models.DurationUnit;
    activeDuration: number;
    orderEarnRules: OrderEarnPointsRule[];
    loginEarnRules: LoginEarnPointsRule[];
  }

  interface RedeemPointSettings {
    exchangeRate: number;
    orderRedeemRules: OrderRedeemPointsRule[];
  }

  interface OrderEarnPointsRule {
    value: number;
    isPercent: boolean;
    description: string;
    condition: Kooboo.Sites.Commerce.Condition.Define;
  }

  interface LoginEarnPointsRule {
    value: number;
    durationUnit: Kooboo.Data.Models.DurationUnit;
    description: string;
    condition: Kooboo.Sites.Commerce.Condition.Define;
  }

  interface OrderRedeemPointsRule {
    value: number;
    isPercent: boolean;
    description: string;
    condition: Kooboo.Sites.Commerce.Condition.Define;
  }

}
declare namespace Kooboo.Sites.Commerce.CustomData {
  interface CustomField {
    name: string;
    displayName: string;
    type: FieldType;
    contentFolder: string;
    editable: boolean;
    multilingual: boolean;
    multiple: boolean;
    allowRepetition: boolean;
    isSummaryField: boolean;
    isSystemField: boolean;
    tooltip: string;
    embedded: boolean;
    group: string;
    options: Record<string, any>;
    validations: FieldValidation[];
    selectionOptions: any[];
    settings: string;
  }

  interface MultilingualValue extends Record<string, any> {
    comparer: any;
    count: number;
    capacity: number;
    keys: string[];
    values: any;
    item?: any;
    add(key: string, value: any): void;
    clear(): void;
    containsKey(key: string): boolean;
    containsValue(value: any): boolean;
    getObjectData(info: any, context: any): void;
    getAlternateLookup(): any;
    tryGetAlternateLookup(lookup: any): boolean;
    onDeserialization(sender: any): void;
    remove(key: string): boolean;
    remove(key: string, value: any): boolean;
    tryGetValue(key: string, value: any): boolean;
    tryAdd(key: string, value: any): boolean;
    ensureCapacity(capacity: number): number;
    trimExcess(): void;
    trimExcess(capacity: number): void;
  }

  type FieldType = 'TextBox' | 'TextArea' | 'RichEditor' | 'Selection' | 'CheckBox' | 'RadioBox' | 'Switch' | 'Number' | 'Content' | 'MediaFile' | 'File' | 'DateTime' | 'ColorPicker' | 'KeyValues' | 'ValueList' | 'AdvancedMediaFile';

  interface FieldValidation {
    name: string;
    type: string;
    min?: number;
    max?: number;
    pattern: string;
    value: number;
    msg: string;
  }

}
declare namespace Kooboo.Sites.Commerce.Notification {
  interface EmailNotification {
    id: string;
    event: string;
    subjectTemplate: string;
    bodyTemplate: string;
    sendToCustomer: boolean;
    sendToAddresses: string[];
  }

  interface Webhook {
    event: string;
    url: string;
  }

}
declare namespace Kooboo.Data.Context.RenderCompleted {
  interface LogInfo {
    type: LogType;
    size: number;
    startTime: Date;
    executionEndTime: Date;
    responseEndTime: Date;
    isApiCall: boolean;
    objectId: any;
    constType: number;
    errorMessage: string;
    visitorLog: Kooboo.Data.Models.VisitorLog;
    blockErrors: CodeBlockError[];
    hasBlockError(): boolean;
  }

  type LogType = 'Unknown' | 'Visitor' | 'ResourceLog' | 'CodeError' | 'NotFound';

  interface CodeBlockError {
    constType: number;
    objectId: any;
    errorMessage: string;
  }

}
declare namespace Kooboo.Data.Server {
  interface SiteCompressionStore {
    fileName: string;
    getOriginal(ObjectId: any, version: number): Kooboo.IndexedDB.FilePart;
    getZstd(ObjectId: any, version: number): Kooboo.IndexedDB.FilePart;
    writeBlobSpan(ObjectId: any, Version: number, OriginalValue: any, ZstdValue: any): Kooboo.IndexedDB.FileIO.CompressionBlobFile;
    readSpan(position: number, length: number, func: any): any;
    readSpan(position: number, length: number, action: ReadSpanAction): void;
    close(): void;
  }

  interface AcceptCH {
    eCT: number;
    downlink: number;
    rTT: number;
    dPR: number;
    colorScheme: Kooboo.Data.Logging.ColorScheme;
    viewportWidth: number;
  }

  type CompressionType = 'None' | 'Gzip' | 'Zstd';

}
declare namespace Kooboo.Sites.Payment.Models {
  interface Card {
    number: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    name: string;
  }

  interface Address {
    firstName: string;
    lastName: string;
    countryCode: string;
    state: string;
    city: string;
    address1: string;
    zip: string;
    email: string;
    phone: string;
  }

}
declare namespace KScript.Payment.Square {
  interface SquareCheckoutParams extends KScript.Payment.Model.ChargeParams {
    /** Stripe checkout success will redirect to this url */
    returnUrl: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

}
declare namespace KScript.Payment.Wechat {
  interface WeChatNativeParams extends KScript.Payment.Model.ChargeParams {
    /** If next action using renderHtml,page will redirect to RedirectUrl */
    redirectUrl: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

}
declare namespace KScript.Payment.Stripe {
  interface StripeCheckoutParams extends KScript.Payment.Model.ChargeParams {
    /** Stripe checkout page back button url */
    cancelUrl: string;
    /** Stripe checkout success will redirect to this url */
    returnUrl: string;
    /** If provider this value,will auto create a stripe customer */
    customer: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface StripePaymentIntentParams extends KScript.Payment.Model.ChargeParams {
    returnUrl: string;
    card: Kooboo.Sites.Payment.Models.Card;
    paymentMethodId: string;
    customer: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface PaynlCheckoutParams extends KScript.Payment.Model.ChargeParams {
    /** Paynl checkout success will redirect to this url */
    returnUrl: string;
    /** The URL where we exchange the status of a transaction. */
    exchangeUrl: string;
    statsData: StatsData;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface PaypalCheckoutParams extends KScript.Payment.Model.ChargeParams {
    /** Paypal checkout page back button url */
    cancelUrl: string;
    /** Paypal checkout success will redirect to this url */
    returnUrl: string;
    brandName: string;
    /** If provider this value,will auto create a stripe customer */
    customer: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface PaypalFormParams extends KScript.Payment.Model.ChargeParams {
    /** Paypal checkout page back button url */
    cancelUrl: string;
    /** Paypal checkout success will redirect to this url */
    returnUrl: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

  interface StatsData {
    extra1: string;
    extra2: string;
    extra3: string;
  }

}
declare namespace KScript.Payment.TowCheckout {
  interface TwoCheckoutParams extends KScript.Payment.Model.ChargeParams {
    /** 2Checkout 3d auth cancel will redirect to this url */
    cancelUrl: string;
    /** 2Checkout 3d auth success will redirect to this url */
    returnUrl: string;
    card: Kooboo.Sites.Payment.Models.Card;
    /** Can be: Visa, Visa electron, Mastercard, Maestro, Amex, Discover, Dankort, Carte bancaire, JCB, Hypercard, Elo card. */
    cardType: string;
    billingAddress: Kooboo.Sites.Payment.Models.Address;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

}
declare namespace Kooboo.Sites.Payment.Methods.TwoCheckout {
  interface TwoCheckoutSetting extends Kooboo.Sites.Payment.IPaymentSetting, Kooboo.Data.Interface.ISiteSetting, Kooboo.Data.Interface.ISettingDescription {
    name: string;
    group: string;
    baseUrl: string;
    merchantCode: string;
    secretKey: string;
    testMode: boolean;
    getAlert(renderContext: Kooboo.Data.Context.RenderContext): string;
  }

}
declare namespace KScript.Payment.Alipay {
  interface AlipayFormParams extends KScript.Payment.Model.ChargeParams {
    /** Alipay checkout success will redirect to this url */
    returnUrl: string;
    /** Order total amount Example: 1.50 */
    totalAmount: number;
    /** Order name Example: 'tea' */
    name: string;
    /** Order detail Example: 'Green tea x2, Black tea x1...' */
    description: string;
    /** USD CNY... */
    currency: string;
    /** If pay for a kooboo commerce order, provide this value,commerce order will update to paid when payment success */
    order: string;
    /** If this value is set, the callback code will execute after the payment is finished */
    callbackCodeName: string;
  }

}
declare namespace Kooboo.Dom.CSS {
  interface CSSRuleList {
    length: number;
    item: CSSRule;
    insertRule(rule: CSSRule, insertIndex: number): number;
    deleteRule(deleteIndex: number): void;
    appendRule(rule: CSSRule): void;
  }

  interface simpleSelector {
  }

  interface CSSStyleDeclaration extends CSSDeclarationBlock {
    cssText: string;
    generateCssText(): string;
    getPropertyValue(propertyname: string): string;
    getPropertyPriority(propertyname: string): boolean;
    setProperty(propertyname: string, value: string, important: boolean): void;
    removeProperty(propertyname: string): void;
    setPropertyValue(propertyname: string, value: string): void;
    setPropertyPriority(propertyname: string, important: boolean): void;
    updateDeclaration(declaration: CSSDeclaration): void;
    merge(styleDeclaration: CSSStyleDeclaration): void;
    hasPartialProperty(partialPropertyName: string): boolean;
  }

  interface CSSStyleRule extends CSSRule {
    selectors: simpleSelector[];
    type: enumCSSRuleType;
    cssText: string;
    styleDeclarationText: string;
    selectorText: string;
  }

  interface CSSRule {
    type: enumCSSRuleType;
    cssText: string;
    styleDeclarationText: string;
    selectorText: string;
  }

  interface CSSDeclaration {
    propertyname: string;
    value: string;
    important: boolean;
    caseSensitive: boolean;
  }

  interface CSSDeclarationBlock {
    cssText: string;
    generateCssText(): string;
    getPropertyValue(propertyname: string): string;
    getPropertyPriority(propertyname: string): boolean;
    setProperty(propertyname: string, value: string, important: boolean): void;
    removeProperty(propertyname: string): void;
    setPropertyValue(propertyname: string, value: string): void;
    setPropertyPriority(propertyname: string, important: boolean): void;
    updateDeclaration(declaration: CSSDeclaration): void;
    merge(styleDeclaration: CSSStyleDeclaration): void;
    hasPartialProperty(partialPropertyName: string): boolean;
  }

  type enumCSSRuleType = 'reserved' | 'STYLE_RULE' | 'CHARSET_RULE' | 'IMPORT_RULE' | 'MEDIA_RULE' | 'FONT_FACE_RULE' | 'PAGE_RULE' | 'KEYFRAMES_RULE' | 'KEYFRAME_RULE' | 'MARGIN_RULE' | 'NAMESPACE_RULE' | 'COUNTER_STYLE_RULE' | 'SUPPORTS_RULE' | 'DOCUMENT_RULE' | 'FONT_FEATURE_VALUES_RULE' | 'VIEWPORT_RULE' | 'REGION_STYLE_RULE' | 'CUSTOM_MEDIA_RULE';

}
declare namespace Kooboo.Sites.ScriptModules.Render {
  interface ModuleRequest {
    resourceType: Kooboo.Sites.ScriptModules.Models.ResourceType;
    relativeFileName: string;
    relativeFileNameWithoutObjectType: string;
    fileInfo: Kooboo.Sites.ScriptModules.ModuleFileInfo;
    diskHandler: Kooboo.Sites.ScriptModules.DiskHandler;
  }

}
declare namespace Kooboo.Sites.OAuth2.BuiltIn {
  interface BuiltInRedirect {
    /** 
* Implement OAuth login using system builtin accounts, in the redirect to page. 

var url = k.account.oAuth.builtIn.Google.getAuthUrl("/ siteCallbackUrl"); 
k.response.redirect(url);
 */
    getAuthUrl(redirectUri: string): string;
    /** 
*In the call back page. 
 var user = k.account.oAuth.builtIn.Google.getUserInfo(); 
 */
    getUserInfo(): any;
  }

}
declare namespace Kooboo.Data.Storage {
  interface ErrorLogStore {
    groupByFunctions: Record<string, (p1:System.String,)=>Kooboo.Data.Models.SiteErrorLog>;
    topStatusCode: Record<string, number>;
    topErrorUrl: Record<string, number>;
    typeName: string;
    collection: Kooboo.Data.Models.SiteErrorLog[];
    byStatusCode(statusCode: number, take: number): Kooboo.Data.Models.SiteErrorLog[];
    byObjId(ObjectId: any, take: number): Kooboo.Data.Models.SiteErrorLog[];
    add(Value: Kooboo.Data.Models.SiteErrorLog): void;
    close(): void;
    readSummary(): WeekLogSummary;
    list(PageNumber: number, PageSize: number): any;
  }

  interface IWeeklyItem {
    id: number;
  }

  interface WeekLogSummary {
    total: number;
    groupBy: Record<string, Record<string, number>>;
    currentReadId: number;
    addGroupBy(GroupKey: string, ObjectValue: string): void;
  }

  interface DayLogSummary {
    daysTotal: Record<number, number>;
    groupBy: Record<string, Record<string, number>>;
    readDay: number;
    readDayId: number;
    isFinished: boolean;
    reachEndCount: number;
    reachEndDay: number;
    addGroupBy(GroupKey: string, ObjectValue: string): void;
  }

}
declare namespace Kooboo.IndexedDB {
  interface Database {
    log: EditLog;
    tableLog: Kooboo.IndexedDB.FileIO.IBlockFile;
    tablePath: string;
    name: string;
    absolutePath: string;
    exists: boolean;
    hasObjectStore(objectStoreName: string): boolean;
    hasTable(talbeName: string): boolean;
    getOrCreateObjectStore(StoreName: string, Parameters?: ObjectStoreParameters): any;
    getOrCreateTable(name: string, setting?: Kooboo.IndexedDB.Dynamic.Setting): Kooboo.IndexedDB.Dynamic.Table;
    getTable(name: string): Kooboo.IndexedDB.Dynamic.Table;
    deleteTable(name: string): void;
    getSequence(name: string): any;
    getSequenceOld(name: string): any;
    getObjectStore(name: string): any;
    getReadingStore(name: string, paras?: ObjectStoreParameters): any;
    rebuildObjectStore(currentStore: any, newParas: ObjectStoreParameters): any;
    restoreFromDisk(StoreName: string): void;
    restoreFromDisk(store: any): any;
    deleteObjectStore(name: string): void;
    deleteDatabase(): void;
    storeList(update: boolean): string[];
    getStore(Name: string): IObjectStore;
    close(): void;
    flush(): void;
    getTables(): string[];
  }

  interface EditLog {
    getNewLogId(): number;
    setLogId(id: number): void;
    add(entry: LogEntry): void;
    delSelf(): void;
    list(take: number, skip?: number, ascending?: boolean): LogEntry[];
    get(VersionId: number): LogEntry;
    getByStoreName(StoreName: string, take: number, skip?: number, ascending?: boolean): LogEntry[];
    getByTableName(tableName: string, take: number, skip?: number, ascending?: boolean): LogEntry[];
    getByStoreName(StoreName: string): LogEntry[];
    deleteByStoreName(StoreName: string): void;
    getByStoreNameAndKey(StoreName: string, Keys: number[], take: number, skip?: number, ascending?: boolean): LogEntry[];
    getLastLogByStoreNameAndKey(StoreName: string, Keys: number[]): LogEntry;
    getByTableNameAndKey(TableName: string, Id: any, take: number, skip?: number, ascending?: boolean): LogEntry[];
    getByTableNameAndKey(TableName: string, Keys: number[], take: number, skip?: number, ascending?: boolean): LogEntry[];
    getLastLogByTableNameAndKey(TableName: string, Id: any): LogEntry;
    getLastLogByTableNameAndKey(TableName: string, Keys: number[]): LogEntry;
    getPreviousTableLog(current: LogEntry): LogEntry;
    getJustDeletedVersion(StoreName: string, key: number[]): number;
    getCollection(ascending: boolean): LogEntry[];
    getCollection(ascending: boolean, skip: number, take: number): LogEntry[];
  }

  type EditType = 'Add' | 'Update' | 'Delete';

  interface FilePart {
    fullFileName: string;
    blockPosition: number;
    relativePosition: number;
    startPosition: number;
    relativePositionStart: number;
    length: number;
    fieldName: string;
  }

  interface LogEntry {
    id: number;
    storeName: string;
    storeNameHash: number;
    tableName: string;
    tableNameHash: number;
    tableColName: string;
    isTable: boolean;
    userId: any;
    keyBytes: number[];
    keyHash: any;
    editType: EditType;
    updateTime: Date;
    timeTick: number;
    oldBlockPosition: number;
    newBlockPosition: number;
    toHashGuid(bytes: number[]): any;
  }

  interface IObjectStore {
    name: string;
    objectFolder: string;
    ownerDatabase: Database;
    count(): number;
    close(): void;
    delSelf(): void;
    flush(): void;
    add(key: any, value: any): boolean;
    update(key: any, value: any): boolean;
    delete(key: any): void;
    get(key: any): any;
    list(count?: number, skip?: number): any[];
    rollBack(log: LogEntry): void;
    rollBack(loglist: LogEntry[]): void;
    rollBack(LastVersionId: number, SelfIncluded?: boolean): void;
    rollBackTimeTick(TimeTick: number, SelfIncluded?: boolean): void;
    checkOut(VersionId: number, DestinationStore: IObjectStore, SelfIncluded?: boolean): void;
    checkOut(logs: LogEntry[], DestinationStore: IObjectStore): void;
    getLength(blockposition: number): number;
  }

  interface ObjectStoreParameters {
    primaryKeyLength: number;
    primaryKey: string;
    enableLog: boolean;
    enableVersion: boolean;
    useDefaultNETBinaryFormater: boolean;
    useMsgPackSerializer: boolean;
    maxCacheLevel: number;
    addColumn(FieldOrPropertyName: string, maxlength: number): void;
    addColumn(FieldOrPropertyName: string): void;
    addColumn(expression: any): void;
    addColumn(expression: any, maxlength: number): void;
    addIndex(FieldOrPropertyName: string, maxlength: number): void;
    addIndex(FieldOrPropertyName: string): void;
    addIndex(expression: any): void;
    addIndex(expression: any, maxlength: number): void;
    setPrimaryKeyField(expression: any, len?: number): void;
  }

}
declare namespace Kooboo.Sites.Analytics.ABTest {
  interface AbTestStore {
    assignmentStore: DailyUserAssignmentStore;
    getStatStore(TestName: string): AbTestStatStore;
    hasObjectId(ObjectId: any): boolean;
    getActiveTests(objectType: number, objectId: any): Kooboo.Sites.Analytics.ABTest.Models.AbTestModel[];
    addOrUpdate(test: Kooboo.Sites.Analytics.ABTest.Models.AbTestModel): void;
    delete(testName: string): void;
    getAll(): Kooboo.Sites.Analytics.ABTest.Models.AbTestModel[];
    get(TestName: string): Kooboo.Sites.Analytics.ABTest.Models.AbTestModel;
  }

  interface AbTestStatStore {
    testName: string;
    variantStat: any;
    updateImpression(variantId: number, isUniqueUser: boolean): void;
    updateConversion(revenue: number, variantId: number): void;
    close(): void;
    dispose(): void;
  }

  interface DailyUserAssignmentStore {
    dateName: string;
    getUserAssignment(UserId: any, TestName: string): number;
    assignUser(UserId: any, TestName: string, VariantId: number): void;
    close(): void;
    dispose(): void;
  }

}
declare namespace Kooboo.Sites.AIBuilder.Application {
  interface AppBuilderStore {
    setLang(lang: string): void;
    getLang(): string;
    getByName(Name: string): any;
    get(id: any): any;
    get(): any;
    addOrUpdate(model: any): void;
    addOrUpdateEntity(entity: Kooboo.Sites.AIBuilder.Application.Model.Entity, Merge?: boolean): string;
    combineEntity(response: Kooboo.Sites.AIBuilder.Application.Response.EntityResponse): Kooboo.Sites.AIBuilder.Application.Model.Entity;
    factsByEntityId(entityId: any): Kooboo.Sites.AIBuilder.Application.Model.Fact[];
    factsByEntity(entity: Kooboo.Sites.AIBuilder.Application.Model.Entity): Kooboo.Sites.AIBuilder.Application.Model.Fact[];
    entitiesByFact(factId: any): Kooboo.Sites.AIBuilder.Application.Model.Entity[];
    entitiesByFacts(factIds: any[]): Record<any, any>;
    entityUsedBy(entityId: any): Kooboo.Sites.AIBuilder.Application.ViewModel.EntityUsedBy[];
    entityUsedBy(entity: Kooboo.Sites.AIBuilder.Application.Model.Entity): Kooboo.Sites.AIBuilder.Application.ViewModel.EntityUsedBy[];
    acceptFactSplit(model: Kooboo.Sites.AIBuilder.Application.Response.FactSplitResponse): void;
    delete(Id: any): void;
    listByRef(RefId: any): any[];
    listByType(): any[];
    buildBackGroundChain(model: any): string;
    buildDomainContextInfo(): string;
    addOrUpdateFact(fact: Kooboo.Sites.AIBuilder.Application.Model.Fact): void;
    entitiesFilterByFacts(AllEntities: Kooboo.Sites.AIBuilder.Application.Model.Entity[], Facts: Kooboo.Sites.AIBuilder.Application.Model.Fact[]): Kooboo.Sites.AIBuilder.Application.Model.Entity[];
    listScenarioViews(scenarioNames: string[], IncludeFacts?: boolean): Kooboo.Sites.AIBuilder.Application.ViewModel.ScenarioViewModel[];
    wireFrameByPage(pageUrl: string): Kooboo.Sites.AIBuilder.Application.Model.WireFrame;
  }

}
declare namespace Kooboo.Sites.Sync.SiteClusterSync {
  interface SiteClusterManager {
    control: ControlFlow;
    isRunning: boolean;
    pushQueue: PushTask[];
    siteCluster: Kooboo.Sites.Models.SiteCluster[];
    addTask(repo: Kooboo.Data.Interface.IRepository, value: Kooboo.Data.Interface.ISiteObject, changetype: Kooboo.ChangeType): void;
    addTask(inTask: PushTask): void;
    peekTask(): PushTask;
    resetCluster(): void;
    setClusterVersion(ClusterId: any, Version: number): void;
    getSyncObject(task: PushTask): Kooboo.Sites.Sync.SyncObject;
    receive(SyncObject: Kooboo.Sites.Sync.SyncObject, ClientIp: string): void;
    receive(SyncObject: Kooboo.Sites.Sync.SyncObject, FromNode: Kooboo.Sites.Models.SiteCluster): void;
    initStart(): void;
    ensureStart(): void;
    getLogItems(clusterId: any): Kooboo.IndexedDB.LogEntry[];
    getLogItems(cluster: Kooboo.Sites.Models.SiteCluster): Kooboo.IndexedDB.LogEntry[];
  }

  interface PushTask {
    isDelete: boolean;
    objectId: any;
    storeName: string;
    clusterId: any;
    version: number;
    compareTo(other: PushTask): number;
  }

  interface ControlFlow {
    lockItem(ClusterId: any, ObjectId: any): void;
    unlockItem(ClusterId: any, ObjectId: any): void;
    hasLock(ClusterId: any, ObjectId: any): boolean;
  }

}
declare namespace Kooboo.Sites.AI.Functions.Custom {
  interface SiteAIFunctionRepository extends Kooboo.Sites.Repository.ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: Kooboo.Sites.Repository.SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    init(): void;
    isEqualTo(value: SiteAIFunction): boolean;
    addOrUpdate(value: SiteAIFunction, UserId: any): boolean;
    addOrUpdate(value: SiteAIFunction, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: SiteAIFunction): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): SiteAIFunction;
    getFromCache(id: any): SiteAIFunction;
    get(nameorid: string): SiteAIFunction;
    getWithEvent(id: any): SiteAIFunction;
    getByUrl(relativeUrl: string): SiteAIFunction;
    getMetaByUrl(relativeUrl: string): SiteAIFunction;
    getByNameOrId(NameOrGuid: string): SiteAIFunction;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): SiteAIFunction[];
    all(): SiteAIFunction[];
    list(UseColumnData?: boolean): SiteAIFunction[];
    isEqual(x: SiteAIFunction, y: SiteAIFunction): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: SiteAIFunction): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  interface SiteAIFunction extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.CoreObject {
    id: any;
    function: string;
    inputSchema: string;
    description: string;
    tags: string[];
    approvalRequired: boolean;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

}
declare namespace Kooboo.Sites.BackendEvent {
  interface BackendRuleRepository extends Kooboo.Sites.Repository.ISiteRepositoryBase, Kooboo.Data.Interface.IRepository {
    storeParameters: Kooboo.IndexedDB.ObjectStoreParameters;
    siteDb: Kooboo.Sites.Repository.SiteDb;
    siteObjectType: any;
    useCache: boolean;
    webSite: Kooboo.Data.Models.WebSite;
    storeName: string;
    store: any;
    query: any;
    tableScan: any;
    listByEventType(eventType: EventType): BackendRule[];
    init(): void;
    isEqualTo(value: BackendRule): boolean;
    addOrUpdate(value: BackendRule, UserId: any): boolean;
    addOrUpdate(value: BackendRule, UserId: any, betweenEvent: ()=>void): boolean;
    addOrUpdate(value: BackendRule): boolean;
    delete(id: any): number;
    delete(id: any, UserId: any): number;
    delete(id: any, UserId: any, betweenEvent: ()=>void): number;
    getLatestVersion(Id: any): number;
    get(id: any, getColumnDataOnly?: boolean): BackendRule;
    getFromCache(id: any): BackendRule;
    get(nameorid: string): BackendRule;
    getWithEvent(id: any): BackendRule;
    getByUrl(relativeUrl: string): BackendRule;
    getMetaByUrl(relativeUrl: string): BackendRule;
    getByNameOrId(NameOrGuid: string): BackendRule;
    getUsedBy(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    getUsedByForCount(ObjectId: any): Kooboo.Data.Models.UsedByRelation[];
    count(): number;
    all(UseColumnData: boolean): BackendRule[];
    all(): BackendRule[];
    list(UseColumnData?: boolean): BackendRule[];
    isEqual(x: BackendRule, y: BackendRule): boolean;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(logList: Kooboo.IndexedDB.LogEntry[]): void;
    checkBeingUsed(SiteObject: BackendRule): Kooboo.Sites.Relation.ObjectRelation[];
    checkBeingUsed(ObjectId: any): Kooboo.Sites.Relation.ObjectRelation[];
    rebuild(): void;
  }

  type EventType = 'ImageUploading' | 'ImageUpload' | 'ImageUpdating' | 'ImageUpdated' | 'ImageDeleting' | 'ImageDelete' | 'PageCreating' | 'PageCreated' | 'PageUpdating' | 'PageUpdated' | 'PageDeleting' | 'PageDeleted' | 'ViewCreating' | 'ViewCreated' | 'ViewUpdating' | 'ViewUpdated' | 'ViewDeleting' | 'ViewDeleted' | 'LayoutCreating' | 'LayoutCreated' | 'LayoutUpdating' | 'LayoutUpdated' | 'LayoutDeleting' | 'LayoutDeleted' | 'CodeCreating' | 'CodeCreated' | 'CodeUpdating' | 'CodeUpdated' | 'CodeDeleting' | 'CodeDeleted' | 'MenuCreating' | 'MenuCreated' | 'MenuUpdating' | 'MenuUpdated' | 'MenuDeleting' | 'MenuDeleted' | 'HtmlBlockCreating' | 'HtmlBlockCreated' | 'HtmlBlockUpdating' | 'HtmlBlockUpdated' | 'HtmlBlockDeleting' | 'HtmlBlockDeleted' | 'ContentCreating' | 'ContentCreated' | 'ContentUpdating' | 'ContentUpdated' | 'ContentDeleting' | 'ContentDeleted' | 'LabelCreating' | 'LabelCreated' | 'LabelUpdating' | 'LabelUpdated' | 'LabelDeleting' | 'LabelDeleted' | 'ScriptCreating' | 'ScriptCreated' | 'ScriptUpdating' | 'ScriptUpdated' | 'ScriptDeleting' | 'ScriptDeleted' | 'StyleCreating' | 'StyleCreated' | 'StyleUpdating' | 'StyleUpdated' | 'StyleDeleting' | 'StyleDeleted' | 'ProductCreating' | 'ProductCreated' | 'ProductUpdating' | 'ProductUpdated' | 'ProductDeleting' | 'ProductDeleted' | 'ProductCopied' | 'ProductCategoryCreating' | 'ProductCategoryCreated' | 'ProductCategoryUpdating' | 'ProductCategoryUpdated' | 'ProductCategoryDeleting' | 'ProductCategoryDeleted' | 'OrderConfirmed' | 'OrderDelivered' | 'OrderCancelled';

  interface BackendRule extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.ICoreObject, Kooboo.Sites.Models.CoreObject {
    eventType: EventType;
    rule: Kooboo.Sites.Models.IFElseRule;
    online: boolean;
    version: number;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    id: any;
    name: string;
    clone(): any;
  }

}
declare namespace Kooboo.Logging {
  type LogLevel = 'Debug' | 'Information' | 'Warning' | 'Error' | 'Critical';

}
declare namespace KScript.Parameter {
  interface RoutableText {
    name: string;
    body: string;
    url: string;
  }

}
declare namespace Kooboo.Lib.Utilities.UAParser {
  interface ClientInfo {
    platform: string;
    oS: string;
    application: ApplicationInfo;
    device: string;
    fromInt(value: number): ClientInfo;
  }

  interface ApplicationInfo {
    isWebBrowser: boolean;
    isWebView: boolean;
    name: string;
    version: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.SiteItem.TypeDefinition {
  interface BinaryObject extends Kooboo.Data.Interface.ISiteObject, Kooboo.Data.Interface.IBinaryFile, Kooboo.Data.Interface.IExtensionable {
    contentBytes: number[];
    size: number;
    extension: string;
    creationDate: Date;
    lastModified: Date;
    id: any;
    name: string;
  }

}
declare namespace Kooboo.Sites.DataTraceAndModify {
  interface ITraceability {
    source: string;
    getTraceInfo(): any;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Redis {
  interface ValueWithExpiry {
    expirySeconds: number;
    value: string;
  }

}
declare namespace Kooboo.Sites.Scripting.Global.Office.Excel {
  interface KWorkBook {
    sheets: KSheet[];
    numberOfSheets: number;
    /** Write the excel to file */
    write(fileName: string): void;
    getSheetAt(index: number): KSheet;
    getSheet(sheetName: string): KSheet;
    getSheetIndex(sheetName: string): number;
    /** Create a sheet with specify sheetName. */
    createSheet(sheetName: string): KSheet;
    /** Read binary data of the excel. */
    readAsBytes(): number[];
    /** Get the extension name of the excel. The result would be .xls or .xlsx */
    getExtentionName(): string;
  }

  interface KExcelReadRange {
    /** The first row index to be readed in the sheet.
The rows which index little than the FirstRowIndex will be ignored.
If FirstRowIndex is null, the row.FirstRowNum will instead it. */
    firstRowIndex?: number;
    /** The last row index to be readed in the sheet.
The rows which index great than the LastRowIndex will be ignored.
If LastRowIndex is null, the row.LastRowNum will instead it. */
    lastRowIndex?: number;
    /** The first column index to be readed in the sheet.
The columns which index little than the FirstColumnIndex will be ignored.
If FirstColumnIndex is null, 0 will instead it. */
    firstColumnIndex?: number;
    /** The column row index to be readed in the sheet.
The columns which index great than the LastColumnIndex will be ignored.
If LastColumnIndex is null, the (row.LastCellNum -1) will instead it. row.LastCellNum equal to the last cell index PLUSE ONE. */
    lastColumnIndex?: number;
  }

  interface KSheet {
    name: string;
    firstRowNum: number;
    lastRowNum: number;
    rows: KExcelRow[];
    /** ```ts
// Read the sheet data as objects. The first row will be readed as column names of below data.
// range:Specify the range of the rows and columns to read.
// example:
sheet.getObjectData({firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastRowIndex:3})
```
 */
    getObjectData(range?: KExcelReadRange): Record<string, any>[];
    /** ```ts
// Read the sheet data as arrays.
// range:Specify the range of the rows and columns to read.
// example:
sheet.getArrayData({firstColumnIndex:0,lastColumnIndex:1,firstRowIndex:0,lastRowIndex:3})
```
 */
    getArrayData(range?: KExcelReadRange): any[];
    /** ```ts
// Fill data to the sheet.The jsonObject is a json string. The json data should be an array with objects has same keys.
data example:[{"Id":"1","Name":"My Name","Age":12,"CreationTime":"2022-12-11 20:00:00"},{"Id":"2","Name":"His Name","Age":22,"CreationTime":"2021-12-12 20:09:00"}]
```
 */
    fillObjectData(jsonObject: string): void;
    /** ```ts
Fill data to the sheet. The data should be an array with arrays.
arrays example:[["Id","Name","Age","CreationTime"],["1","My Name","12","2022-12-11 20:00:00"],["Id","Name","Age","CreationTime"],["2","His Name","22","2021-12-12 20:09:00"]]
```
 */
    fillArrayData(arrays: any[]): void;
  }

  interface KExcelRow {
    firstCellNum: number;
    lastCellNum: number;
    physicalNumberOfCells: number;
    cells: KExcelCell[];
    data: any[];
  }

  interface KExcelCell {
    value: any;
    type: string;
  }

}
declare namespace Kooboo.IndexedDB.WORM.MetaObject {
  interface IMetaObject {
    metaByteLen: number;
    metaKey: number;
    skipValueBlock: boolean;
    parseMetaBytes(bytes: number[]): void;
    getMetaBytes(): number[];
  }

}
declare namespace Kooboo.Mail.ViewModel {
  interface AddressModel {
    name: string;
    address: string;
  }

}
declare namespace Amazon.SimpleEmail.Model {
  interface SendEmailResponse extends Amazon.Runtime.AmazonWebServiceResponse {
    messageId: string;
    responseMetadata: Amazon.Runtime.ResponseMetadata;
    contentLength: number;
    httpStatusCode: any;
  }

}
declare namespace Kooboo.Mail.Events {
  type EnumMailEvent = 'OnMailIncoming' | 'OnMailReceived' | 'OnMailBoxNotFound' | 'OnMailSending' | 'OnMailSent' | 'OnMessageRead' | 'OnMessageReply' | 'OnMessageCreated' | 'OnMessageDeleted';

}
declare namespace Kooboo.Sites.Commerce.Condition {
  interface Define {
    isAny: boolean;
    items: Item[];
  }

  interface Item {
    option: string;
    method: string;
    value: string;
  }

}
declare namespace Kooboo.Sites.Commerce.Calculate {
  interface DiscountAllocation {
    discountId: string;
    amount: number;
    code: string;
    title: string;
    applyRate(rate: number): DiscountAllocation;
  }

  interface ShippingAllocation {
    cost: number;
    title: string;
    isAdditional: boolean;
    applyRate(rate: number): ShippingAllocation;
  }

}
declare namespace Kooboo.Lib.NETMultiplePart {
  interface File {
    name: string;
    contentType: string;
    fileName: string;
    bytes: number[];
    stream: any;
    copyTo: (p1:System.IO.Stream,)=>void;
  }

}
declare namespace Kooboo.Data.Config {
  interface SiteBinding {
    id: any;
    domainId: any;
    subDomain: string;
    organizationId: any;
    webSiteId: any;
    fullDomain: string;
    device: string;
    redirect: string;
    culture: string;
    ipAddress: string;
    port: number;
    isDefaultPortBinding: boolean;
    getSubDomain(): string;
    getRootDomain(): string;
    isSecureDomain(): boolean;
    toOldBinding(OrgId: any): Kooboo.Data.Models.Binding;
  }

}
declare namespace Kooboo.IndexedDB.FileIO {
  interface CompressionBlobFile {
    startPosition: number;
    reservedValueLength: number;
  }

  interface IBlockFile {
    fullFileName: string;
    length: number;
    add(bytes: number[], totalByteLen: number): number;
    get(position: number): number[];
    getPartial(position: number, offset: number, count: number): number[];
    updatePart(diskPosition: number, parts: number[]): boolean;
    updateCol(position: number, relativePosition: number, length: number, values: number[]): void;
    delete(position: number): void;
    getLength(position: number): number;
    getCol(position: number, relativePos: number, len: number): number[];
    getAllCols(position: number, ColumnLen: number): number[];
    flush(): void;
    close(): void;
    delSelf(): void;
    get(position: number, converter: any): any;
    getAllCols(position: number, ColumnLen: number, converter: any): any;
    readFile(position: number): any;
  }

  interface IFileReader {
    binary: Kooboo.IndexedDB.FilePart;
    setFieldValue(FieldHash: number, span: any): void;
    isBinaryField(FieldHash: number): boolean;
  }

}
declare namespace Kooboo.IndexedDB.Dynamic {
  interface Setting {
    enableLog: boolean;
    columns: TableColumn[];
    addIndex(FieldName: string, DataType: any, length?: number, IsUnique?: boolean): void;
    addIndex(expression: any, len?: number): void;
    setPrimaryKey(expression: any, len?: number): void;
    setPrimaryKey(FieldName: string, DataType: any, length?: number): void;
    ensurePrimaryKey(FieldName: string): void;
    addColumn(col: TableColumn): void;
    assignControlType(datatype: any, value?: any): string;
    appendColumn(FieldOrPropertyName: string, DataType: any, length: number): void;
    appendColumn(expression: any, length?: number): void;
  }

  interface Table {
    setting: Setting;
    currentUserId: any;
    objectConverter: Kooboo.IndexedDB.Dynamic.Converter.ObjectConverter;
    blockFile: BlockFile;
    length: number;
    count: number;
    keys: any[];
    indexs: ITableIndex[];
    objectFolder: string;
    name: string;
    ownerDatabase: Kooboo.IndexedDB.Database;
    firstKey: any;
    lastKey: any;
    query: Query;
    rebuildTable(newSetting: Setting): void;
    updateSetting(newSetting: Setting): void;
    prepareData(dataObj: any, Update?: boolean): Record<string, any>;
    add(Value: any, CheckCol?: boolean, result?: TableActionResult): any;
    getLogData(log: Kooboo.IndexedDB.LogEntry): Record<string, any>;
    getLogData(LogId: number, DiskPosition: number): Record<string, any>;
    get(key: any): any;
    getDiskPos(key: any): number;
    getDiskPos(key: any): number;
    getValue(diskposition: number): any;
    get(key: any): any;
    get(key: any): any;
    delete(key: any): number;
    updateOrAdd(newValue: any): boolean;
    update(key: any, newValue: any, result?: TableActionResult): boolean;
    update(newValue: any): boolean;
    update(key: any, newValue: any): void;
    all(): any[];
    all(): any[];
    updateColumn(key: any, ColumnName: string, value: any): boolean;
    updateColumn(key: any, expression: any, newvalue: any): void;
    close(): void;
    flush(): void;
    delSelf(): void;
    createIndex(fieldName: string, unique?: boolean, setting?: Setting): void;
    createIndex(FieldNameExpression: any, unique?: boolean): void;
    removeIndex(FieldNameExpression: any): void;
    removeIndex(FieldName: string): void;
    rollBack(log: Kooboo.IndexedDB.LogEntry): void;
    rollBack(loglist: Kooboo.IndexedDB.LogEntry[]): void;
    checkOut(VersionId: number, destinationTable: Table, SelfIncluded: boolean, UpdateSetting?: boolean): void;
  }

  interface TableColumn {
    name: string;
    dataType: string;
    length: number;
    isComplex: boolean;
    relativePosition: number;
    clrType: any;
    isIncremental: boolean;
    seed: number;
    increment: number;
    isIndex: boolean;
    isPrimaryKey: boolean;
    isUnique: boolean;
    isSystem: boolean;
    controlType: string;
    setting: string;
  }

  interface TableActionResult {
    id: any;
    version: number;
  }

  interface BlockFile {
    stream: any;
    openOrCreate(): void;
    getContent(position: number, KeyColumnOffset: number): number[];
    getKey(position: number, ColumnOffset: number, KeyLength: number): number[];
    add(bytes: number[], TotalByteLen: number): number;
    updateBlock(bytes: number[], blockPosition: number): void;
    get(position: number): number[];
    getTolerance(position: number): number;
    get(position: number, ColumnLen: number): number[];
    getCol(position: number, relativePos: number, len: number): number[];
    updateCol(position: number, relativeposition: number, length: number, values: number[]): boolean;
    close(): void;
    flush(): void;
  }

  interface ITableIndex {
    length: number;
    fieldName: string;
    isIncremental: boolean;
    seed: number;
    isUnique: boolean;
    increment: number;
    keyType: any;
    isPrimaryKey: boolean;
    isSystem: boolean;
    nextIncrement(): number;
    add(key: any, blockPosition: number): boolean;
    update(oldKey: any, oldBlockPosition: number, newBlockPosition: number): void;
    update(oldKey: any, newkey: any, oldBlockPosition: number, newBlockPosition: number): void;
    get(key: any): number;
    list(key: any): number[];
    del(key: any, blockPosition: number): boolean;
    del(key: any): number[];
    count(distinct: boolean): number;
    allItems(ascending: boolean): Kooboo.IndexedDB.BTree.ItemCollection;
    getCollection(startBytes: number[], endBytes: number[], lowerOpen: boolean, upperOpen: boolean, ascending: boolean): Kooboo.IndexedDB.BTree.ItemCollection;
    allKeys(ascending: boolean): Kooboo.IndexedDB.BTree.KeyBytesCollection;
    close(): void;
    flush(): void;
    delSelf(): void;
  }

  interface Query {
    orderByFieldName: string;
    node: Kooboo.IndexedDB.Condition.Expression.Node;
    where(FieldOrPropertyName: string, comparer: Kooboo.IndexedDB.Query.Comparer, CompareValue: any): Query;
    whereEqual(FieldOrPropertyName: string, Value: boolean): Query;
    whereIn(FieldOrPropertyName: string, Values: any[]): Query;
    whereIn(FieldOrPropertyName: string, Values: any[]): Query;
    whereIn(FieldExpression: any, Values: any[]): Query;
    whereEqual(FieldOrPropertyName: string, Value: any): Query;
    whereEqual(FieldOrPropertyName: string, Value: any): Query;
    where(FieldOrPropertyName: string, comparer: Kooboo.IndexedDB.Query.Comparer, CompareValue: Date, scope: Kooboo.IndexedDB.Query.DateTimeScope): Query;
    orderByAscending(): Query;
    orderByAscending(FieldOrPropertyName: string): Query;
    orderByDescending(): Query;
    orderByDescending(FieldOrPropertyName: string): Query;
    skip(count: number): Query;
    firstOrDefault(): any;
    firstOrDefault(): any;
    exists(): boolean;
    findAll(searchtext: string): any[];
    findAll(node: Kooboo.IndexedDB.Condition.Expression.Node): any[];
    findAll(searchtext: string): any[];
    find(searchtext: string): any;
    find(node: Kooboo.IndexedDB.Condition.Expression.Node): any;
    find(searchtext: string): any;
    parserFilter(conditiontext: string): Kooboo.IndexedDB.Condition.Expression.Node;
    valueNodeHandle(expression: Kooboo.IndexedDB.Condition.Expression.Node): void;
    take(count: number): any[];
    take(count: number): any[];
    selectAll(): any[];
    selectAll(): any[];
    count(): number;
  }

  interface FieldConverter extends Kooboo.IndexedDB.Columns.IColumn {
    fieldNameHash: number;
    fieldName: string;
    length: number;
    relativePosition: number;
    isComplex: boolean;
    isIncremental: boolean;
    dataType: any;
    skipDefaultValue: boolean;
    toBytes: (p1:System.Byte[],)=>System.Object;
    fromBytes: (p1:System.Object,)=>System.Byte[];
  }

}
declare namespace Kooboo.Sites.Relation {
  interface ObjectRelation extends Kooboo.Data.Interface.ISiteObject, Kooboo.IndexedDB.BPlusTree.IBPlusTreeObject, Kooboo.Sites.Models.SiteObject {
    id: any;
    objectXId: any;
    objectYId: any;
    constTypeX: number;
    constTypeY: number;
    combineId: number[];
    routeDestinationType: number;
    bPlusTreeLen: number;
    skipValueBlock: boolean;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    setBPlusBytes(bytes: number[]): void;
    getBPlusBytes(): number[];
    clone(): any;
  }

}
declare namespace Kooboo.Sites.SiteTransfer.Model {
  interface ContinueConverter extends Kooboo.Data.Interface.ISiteObject, Kooboo.Sites.Models.SiteObject {
    id: any;
    convertType: string;
    originalPageId: any;
    convertedTag: string;
    objectNameOrId: string;
    koobooId: string;
    elementPaths: string[];
    elementTag: string;
    hash: any;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

}
declare namespace Kooboo.Api {
  interface ApiCall {
    context: Kooboo.Data.Context.RenderContext;
    command: ApiCommand;
    webSite: Kooboo.Data.Models.WebSite;
    objectId: any;
    nameOrId: string;
    isFake: boolean;
    getValue(name: string): string;
    getValue(name: string, DefaultValue: any): any;
    getValue(name: string): any;
    getGuidValue(name: string): any;
    getBoolValue(name: string): boolean;
    getLongValue(name: string): number;
    getIntValue(name: string): number;
    getRequestValue(Name: string): string;
    getValue(names: string[]): string;
  }

  interface ApiCommand {
    objectType: string;
    method: string;
    value: string;
    version: string;
    httpMethod: string;
    parameters: string[];
  }

}
declare namespace Kooboo.Sites.Analytics.ABTest.Models {
  interface AbTestModel {
    name: string;
    description: string;
    constObjectType: number;
    objectId: any;
    objectDisplayName: string;
    status: AbTestStatus;
    createdAt: Date;
    startAt: Date;
    endAt: Date;
    userCondition: AbTestCondition;
    variants: AbVariant[];
    goalId: number;
    isRunning: boolean;
  }

  type AbTestStatus = 'Draft' | 'Running' | 'Paused' | 'Completed';

  interface AbTestCondition {
    script: string;
    filters: AbTestFilter[];
  }

  interface AbVariant {
    id: number;
    name: string;
    weight: number;
    content: AbVariantContent;
  }

  interface AbTestFilter {
    property: string;
    comparer: string;
    value: any;
  }

  interface AbVariantContent {
    constObjectType: number;
    objectId: any;
    displayName: string;
    objectName: string;
    fieldOverWrites: boolean;
    fieldOverrides: AbFieldOverride[];
  }

  interface AbFieldOverride {
    fieldName: string;
    values: AbLocalizedValue[];
  }

  interface AbLocalizedValue {
    culture: string;
    value: string;
  }

}
declare namespace Kooboo.Sites.AIBuilder.Application.Response {
  interface EntityResponse {
    name: string;
    dbName: string;
    oldDbNames: string[];
    modelKind: string;
    storage: string;
    sourceEntities: string[];
    classificationReason: string;
    attributes: Kooboo.Sites.AIBuilder.Application.Model.EntityAttribute[];
  }

  interface FactSplitResponse {
    facts: FactAnalysis[];
  }

  interface FactAnalysis {
    factId: any;
    originalFactExpression: string;
    originalSentence: string;
    shouldSplit: boolean;
    reason: string;
    splitFacts: SplitFact[];
  }

  interface SplitFact {
    factExpression: string;
    sentence: string;
  }

}
declare namespace Kooboo.Sites.AIBuilder.Application.ViewModel {
  interface EntityUsedBy {
    factId: any;
    factExpression: string;
    sentence: string;
    role: string;
  }

  interface ScenarioViewModel {
    name: string;
    description: string;
    facts: FactView[];
  }

  interface FactView {
    factExpression: string;
    factSentence: string;
  }

}
declare namespace Kooboo {
  type ChangeType = 'Add' | 'Update' | 'Delete';

}
declare namespace Kooboo.Sites.SiteTransfer {
  interface TransferTask extends Kooboo.Data.Interface.ISiteObject, Kooboo.Sites.Models.SiteObject {
    id: any;
    domains: string[];
    taskType: EnumTransferTaskType;
    fullStartUrl: string;
    levels: number;
    headless: boolean;
    relativeToRoot: string;
    done: boolean;
    totalPages: number;
    relativeName: string;
    userId: any;
    cookies: Record<string, string>;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  interface TransferPage extends Kooboo.Data.Interface.ISiteObject, Kooboo.Sites.Models.SiteObject {
    id: any;
    taskid: any;
    pageId: any;
    absoluteUrl: string;
    htmlSourceHash: any;
    constType: number;
    creationDate: Date;
    lastModified: Date;
    lastModifyTick: number;
    name: string;
    clone(): any;
  }

  type EnumTransferTaskType = 'ByLevel' | 'BySelectedPages' | 'SinglePage';

}
declare namespace Kooboo.Sites.Repository.BinaryView {
  interface ImageBinaryView extends Kooboo.Data.Interface.ICoreObject, Kooboo.IndexedDB.FileIO.IFileReader {
    binary: Kooboo.IndexedDB.FilePart;
    id: any;
    name: string;
    alt: string;
    extension: string;
    isSvg: boolean;
    height: number;
    width: number;
    size: number;
    version: number;
    online: boolean;
    isBinaryField(FieldHash: number): boolean;
    setFieldValue(fieldHash: number, span: any): void;
  }

}
declare namespace Kooboo.Sites.FrontEvent {
  type enumEventType = 'RouteFinding' | 'RouteFound' | 'RouteNotFound' | 'ViewFinding' | 'ViewFound' | 'ViewNotFound' | 'PageFinding' | 'PageFound';

  interface Condition {
    left: string;
    operator: string;
    right: string;
  }

}
declare namespace Kooboo.Mail.Repositories.Sqlite {
  interface FolderRepo {
    addOrUpdate(folder: Kooboo.Mail.Folder): boolean;
    get(name: string, isMigration?: boolean): Kooboo.Mail.Folder;
    getFolderId(name: string): number;
    get(id: number): Kooboo.Mail.Folder;
    rename(folder: Kooboo.Mail.Folder, newName: string, Recursive?: boolean): void;
    delete(folder: Kooboo.Mail.Folder): void;
    delete(folderId: number): void;
    move(folderId: number, targetFolder: string): void;
    add(name: string): void;
    add(folder: Kooboo.Mail.Folder): void;
    subscribe(folder: Kooboo.Mail.Folder): void;
    unsubscribe(folder: Kooboo.Mail.Folder): void;
    allFolders(): Kooboo.Mail.Folder[];
    all(): Kooboo.Mail.Folder[];
  }

  interface AddressBookRepo {
    get(Id: number): Kooboo.Mail.Models.AddressBook;
    getInfoByAddress(address: string): Kooboo.Mail.Models.AddressBook;
    addOrUpdate(addressbook: Kooboo.Mail.Models.AddressBook): boolean;
    getByAddress(fullAddress: string): Kooboo.Mail.Models.AddressBook;
    add(FullAddress: string): void;
    addList(Addresses: string[]): void;
    contains(part: string): string[];
    all(): Kooboo.Mail.Models.AddressBook[];
    delete(id: number): void;
  }

  interface SmtpReportRepo {
    query: any;
    get(messageId: string): Kooboo.Mail.Models.SmtpReport;
    get(Id: any): Kooboo.Mail.Models.SmtpReport;
    add(report: Kooboo.Mail.Models.SmtpReport): void;
    addReport(ReportIn: Kooboo.Mail.Models.SmtpReportIn): void;
    appendReport(currentReport: Kooboo.Mail.Models.SmtpReport, Incoming: Kooboo.Mail.Models.SmtpReportIn): void;
    getReports(messageid: string, To: string, CC: string, BCC: string, UtcCreationTime: Date): SmtpReportViewModel;
    getRcptToList(ToLine: string, CCLine: string, BccLine: string): string[];
    getAddressFromLine(AddressLine: string): string[];
    getAddress(add: MimeKit.MailboxAddress): string;
    trimAddress(singleAddress: string): string;
    deserializeDelivery(json: string): SingleDelivery[];
  }

  interface MessageRepo {
    tableName: string;
    lastKey: number;
    query: any;
    get(Id: number): Kooboo.Mail.Message;
    getByMessageId(messageId: string): Kooboo.Mail.Message;
    getList(): Kooboo.Mail.Message[];
    get(smtpMessageId: string, userId: any, addressId: number, folderId: number): Kooboo.Mail.Message;
    getMeta(id: number): Kooboo.Mail.Message;
    add(msg: Kooboo.Mail.Message, MessageBody: string): void;
    addAndWriteMimeMessage(msg: Kooboo.Mail.Message, MessageBody: MimeKit.MimeMessage): void;
    updateSent(msg: Kooboo.Mail.Message, messageBody: string): void;
    update(msg: Kooboo.Mail.Message, MessageBody: string): void;
    add(value: Kooboo.Mail.Message): boolean;
    add(value: Kooboo.Mail.Message, rawMail: MimeKit.MimeMessage): boolean;
    addOrUpdate(value: Kooboo.Mail.Message): boolean;
    addOrUpdate(value: Kooboo.Mail.Message, rawMail: MimeKit.MimeMessage): boolean;
    update(value: Kooboo.Mail.Message): boolean;
    updateMeta(msg: Kooboo.Mail.Message): void;
    delete(MsgId: number): void;
    toFullMessage(metaMsgs: Kooboo.Mail.Message[]): Kooboo.Mail.Message[];
    toFullMessage(msg: Kooboo.Mail.Message): Kooboo.Mail.Message;
    byUidRange(folder: Kooboo.Mail.Imap.SelectFolder, minId: number, maxId: number): Kooboo.Mail.Message[];
    getBySeqNo(folder: Kooboo.Mail.Imap.SelectFolder, SeqNo: number): Kooboo.Mail.Message;
    getBySeqNos(folder: Kooboo.Mail.Imap.SelectFolder, lower: number, upper: number): Kooboo.Mail.Message[];
    getSeqNo(folder: Kooboo.Mail.Imap.SelectFolder, MsgId: number): number;
    getContent(id: number): string;
    getMimeMessageContent(id: number): MimeKit.MimeMessage;
    markAsRead(MsgId: number, read?: boolean): void;
    updateRecent(Id: number): void;
    updateRecentByMaxId(maxMsgId: number): void;
    move(message: Kooboo.Mail.Message, toFolder: Kooboo.Mail.Folder): void;
    getStat(FolderName: string): Kooboo.Mail.Models.MessageStat;
    getStat(FolderId: number, AddressId?: number): Kooboo.Mail.Models.MessageStat;
    getFlags(MsgId: number): string[];
    getFlags(msg: Kooboo.Mail.Message): string[];
    addFlags(MsgId: number, flags: string[]): void;
    replaceFlags(msgid: number, flags: string[]): void;
    removeFlags(msgid: number, flags: string[]): void;
    addressUnread(FolderId: number): Kooboo.Mail.Models.UnreadCounter[];
    folderUnread(FolderId: number): Kooboo.Mail.Models.UnreadCounter;
    getBySmtpMessageId(smtpMessageId: string): Kooboo.Mail.Message;
  }

  interface CalendarRepo {
    tableName: string;
    add(calendarInfo: Kooboo.Mail.Models.CalendarInfo): void;
    addOrUpdate(calendarInfo: Kooboo.Mail.Models.CalendarInfo): void;
    update(calendarInfo: Kooboo.Mail.Models.CalendarInfo, calendarBody: string): void;
    delete(calendarInfo: Kooboo.Mail.Models.CalendarInfo): void;
    getScheduleById(id: string): Kooboo.Mail.Models.CalendarInfo;
    getAllSchedules(): Kooboo.Mail.Models.CalendarInfo[];
    getSchedulesByTime(start: string, end: string, userId: string): Kooboo.Mail.Models.CalendarInfo[];
  }

  interface MailMigrationJobRepo {
    getAll(): Kooboo.Mail.Models.MailMigrationJob[];
    getActiveJobsByAddress(addressIds: number[]): Kooboo.Mail.Models.MailMigrationJob[];
    add(job: Kooboo.Mail.Models.MailMigrationJob): void;
    get(id: any): Kooboo.Mail.Models.MailMigrationJob;
    get(emailAddress: string, addressId: number): Kooboo.Mail.Models.MailMigrationJob;
    update(job: Kooboo.Mail.Models.MailMigrationJob, values: Record<string, any>): void;
    delete(job: Kooboo.Mail.Models.MailMigrationJob): void;
    deleteByAddressId(addressId: number): void;
  }

  interface MailMigrationProgressRepo {
    getActiveProgressByFolder(folderId: number): Kooboo.Mail.Models.MailMigrationProgress[];
    getOrAdd(jobId: any, folder: string, addressId: number): Kooboo.Mail.Models.MailMigrationProgress;
    update(progress: Kooboo.Mail.Models.MailMigrationProgress, values: Record<string, any>): void;
  }

  interface SmtpReportViewModel {
    isSuccess: boolean;
    isSending: boolean;
    items: SingleDelivery[];
    debug: string;
    fromSmtpReport(report: Kooboo.Mail.Models.SmtpReport, RcptToList: string[], IsRecent: boolean): SmtpReportViewModel;
  }

  interface SingleDelivery {
    to: string;
    isSuccess: boolean;
    isSending: boolean;
    deliveryTime: Date;
    log: string;
    fromReportIn(incoming: Kooboo.Mail.Models.SmtpReportIn): SingleDelivery;
  }

}
declare namespace MimeKit {
  interface MimeMessage {
    headers: HeaderList;
    importance: MessageImportance;
    priority: MessagePriority;
    xPriority: XMessagePriority;
    sender: MailboxAddress;
    resentSender: MailboxAddress;
    from: InternetAddressList;
    resentFrom: InternetAddressList;
    replyTo: InternetAddressList;
    resentReplyTo: InternetAddressList;
    to: InternetAddressList;
    resentTo: InternetAddressList;
    cc: InternetAddressList;
    resentCc: InternetAddressList;
    bcc: InternetAddressList;
    resentBcc: InternetAddressList;
    subject: string;
    date: any;
    resentDate: any;
    references: MessageIdList;
    inReplyTo: string;
    messageId: string;
    resentMessageId: string;
    mimeVersion: any;
    body: MimeEntity;
    textBody: string;
    htmlBody: string;
    bodyParts: MimeEntity[];
    attachments: MimeEntity[];
    getTextBody(format: MimeKit.Text.TextFormat): string;
    getRecipients(onlyUnique?: boolean): MailboxAddress[];
    accept(visitor: MimeVisitor): void;
    prepare(constraint: EncodingConstraint, maxLineLength?: number): void;
    writeTo(options: FormatOptions, stream: any, headersOnly: boolean, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, headersOnly: boolean, cancellationToken?: any): any;
    writeTo(options: FormatOptions, stream: any, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, cancellationToken?: any): any;
    writeTo(stream: any, headersOnly: boolean, cancellationToken?: any): void;
    writeToAsync(stream: any, headersOnly: boolean, cancellationToken?: any): any;
    writeTo(stream: any, cancellationToken?: any): void;
    writeToAsync(stream: any, cancellationToken?: any): any;
    writeTo(options: FormatOptions, fileName: string, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, fileName: string, cancellationToken?: any): any;
    writeTo(fileName: string, cancellationToken?: any): void;
    writeToAsync(fileName: string, cancellationToken?: any): any;
    sign(ctx: MimeKit.Cryptography.CryptographyContext, digestAlgo: MimeKit.Cryptography.DigestAlgorithm, cancellationToken?: any): void;
    signAsync(ctx: MimeKit.Cryptography.CryptographyContext, digestAlgo: MimeKit.Cryptography.DigestAlgorithm, cancellationToken?: any): any;
    sign(ctx: MimeKit.Cryptography.CryptographyContext, cancellationToken?: any): void;
    signAsync(ctx: MimeKit.Cryptography.CryptographyContext, cancellationToken?: any): any;
    encrypt(ctx: MimeKit.Cryptography.CryptographyContext, cancellationToken?: any): void;
    encryptAsync(ctx: MimeKit.Cryptography.CryptographyContext, cancellationToken?: any): any;
    signAndEncrypt(ctx: MimeKit.Cryptography.CryptographyContext, digestAlgo: MimeKit.Cryptography.DigestAlgorithm, cancellationToken?: any): void;
    signAndEncryptAsync(ctx: MimeKit.Cryptography.CryptographyContext, digestAlgo: MimeKit.Cryptography.DigestAlgorithm, cancellationToken?: any): any;
    signAndEncrypt(ctx: MimeKit.Cryptography.CryptographyContext, cancellationToken?: any): void;
    signAndEncryptAsync(ctx: MimeKit.Cryptography.CryptographyContext, cancellationToken?: any): any;
    dispose(): void;
    load(options: ParserOptions, stream: any, persistent: boolean, cancellationToken?: any): MimeMessage;
    loadAsync(options: ParserOptions, stream: any, persistent: boolean, cancellationToken?: any): any;
    load(options: ParserOptions, stream: any, cancellationToken?: any): MimeMessage;
    loadAsync(options: ParserOptions, stream: any, cancellationToken?: any): any;
    load(stream: any, persistent: boolean, cancellationToken?: any): MimeMessage;
    loadAsync(stream: any, persistent: boolean, cancellationToken?: any): any;
    load(stream: any, cancellationToken?: any): MimeMessage;
    loadAsync(stream: any, cancellationToken?: any): any;
    load(options: ParserOptions, fileName: string, cancellationToken?: any): MimeMessage;
    loadAsync(options: ParserOptions, fileName: string, cancellationToken?: any): any;
    load(fileName: string, cancellationToken?: any): MimeMessage;
    loadAsync(fileName: string, cancellationToken?: any): any;
    createFromMailMessage(message: any): MimeMessage;
    toMessageText(): string;
  }

  interface MailboxAddress extends InternetAddress {
    idnMapping: MimeKit.Encodings.IPunycode;
    route: DomainList;
    address: string;
    localPart: string;
    domain: string;
    isInternational: boolean;
    encoding: any;
    name: string;
    clone(): InternetAddress;
    encodeAddrspec(addrspec: string): string;
    decodeAddrspec(addrspec: string): string;
    getAddress(idnEncode: boolean): string;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, length: number, mailbox: MailboxAddress): boolean;
    tryParse(buffer: number[], startIndex: number, length: number, mailbox: MailboxAddress): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, mailbox: MailboxAddress): boolean;
    tryParse(buffer: number[], startIndex: number, mailbox: MailboxAddress): boolean;
    tryParse(options: ParserOptions, buffer: number[], mailbox: MailboxAddress): boolean;
    tryParse(buffer: number[], mailbox: MailboxAddress): boolean;
    tryParse(options: ParserOptions, text: string, mailbox: MailboxAddress): boolean;
    tryParse(text: string, mailbox: MailboxAddress): boolean;
    parse(options: ParserOptions, buffer: number[], startIndex: number, length: number): MailboxAddress;
    parse(buffer: number[], startIndex: number, length: number): MailboxAddress;
    parse(options: ParserOptions, buffer: number[], startIndex: number): MailboxAddress;
    parse(buffer: number[], startIndex: number): MailboxAddress;
    parse(options: ParserOptions, buffer: number[]): MailboxAddress;
    parse(buffer: number[]): MailboxAddress;
    parse(options: ParserOptions, text: string): MailboxAddress;
    parse(text: string): MailboxAddress;
    compareTo(other: InternetAddress): number;
  }

  interface MimeVisitor {
    visit(entity: MimeEntity): void;
    visit(message: MimeMessage): void;
  }

  type EncodingConstraint = 'None' | 'EightBit' | 'SevenBit';

  interface FormatOptions {
    maxLineLength: number;
    newLineFormat: NewLineFormat;
    ensureNewLine: boolean;
    hiddenHeaders: HeaderId[];
    international: boolean;
    allowMixedHeaderCharsets: boolean;
    parameterEncodingMethod: ParameterEncodingMethod;
    alwaysQuoteParameterValues: boolean;
    clone(): FormatOptions;
  }

  interface ParserOptions {
    addressParserComplianceMode: RfcComplianceMode;
    allowUnquotedCommasInAddresses: boolean;
    allowAddressesWithoutDomain: boolean;
    maxAddressGroupDepth: number;
    maxMimeDepth: number;
    parameterComplianceMode: RfcComplianceMode;
    rfc2047ComplianceMode: RfcComplianceMode;
    respectContentLength: boolean;
    charsetEncoding: any;
    clone(): ParserOptions;
    registerMimeType(mimeType: string, type: any): void;
  }

  interface HeaderList extends Array<Header> {
    item: string;
    count: number;
    isReadOnly: boolean;
    add(id: HeaderId, value: string): void;
    add(field: string, value: string): void;
    add(id: HeaderId, encoding: any, value: string): void;
    add(field: string, encoding: any, value: string): void;
    contains(id: HeaderId): boolean;
    contains(field: string): boolean;
    indexOf(id: HeaderId): number;
    indexOf(field: string): number;
    insert(index: number, id: HeaderId, value: string): void;
    insert(index: number, field: string, value: string): void;
    insert(index: number, id: HeaderId, encoding: any, value: string): void;
    insert(index: number, field: string, encoding: any, value: string): void;
    lastIndexOf(id: HeaderId): number;
    lastIndexOf(field: string): number;
    remove(id: HeaderId): boolean;
    remove(field: string): boolean;
    removeAll(id: HeaderId): void;
    removeAll(field: string): void;
    replace(id: HeaderId, encoding: any, value: string): void;
    replace(id: HeaderId, value: string): void;
    replace(field: string, encoding: any, value: string): void;
    replace(field: string, value: string): void;
    writeTo(options: FormatOptions, stream: any, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, cancellationToken?: any): any;
    writeTo(stream: any, cancellationToken?: any): void;
    writeToAsync(stream: any, cancellationToken?: any): any;
    add(header: Header): void;
    clear(): void;
    contains(header: Header): boolean;
    copyTo(array: Header[], arrayIndex: number): void;
    remove(header: Header): boolean;
    replace(header: Header): void;
    indexOf(header: Header): number;
    insert(index: number, header: Header): void;
    removeAt(index: number): void;
    load(options: ParserOptions, stream: any, cancellationToken?: any): HeaderList;
    loadAsync(options: ParserOptions, stream: any, cancellationToken?: any): any;
    load(stream: any, cancellationToken?: any): HeaderList;
    loadAsync(stream: any, cancellationToken?: any): any;
    load(options: ParserOptions, fileName: string, cancellationToken?: any): HeaderList;
    loadAsync(options: ParserOptions, fileName: string, cancellationToken?: any): any;
    load(fileName: string, cancellationToken?: any): HeaderList;
    loadAsync(fileName: string, cancellationToken?: any): any;
  }

  type MessageImportance = 'Low' | 'Normal' | 'High';

  type MessagePriority = 'NonUrgent' | 'Normal' | 'Urgent';

  type XMessagePriority = 'Highest' | 'High' | 'Normal' | 'Low' | 'Lowest';

  interface InternetAddressList extends Array<InternetAddress> {
    mailboxes: MailboxAddress[];
    item: InternetAddress;
    count: number;
    isReadOnly: boolean;
    indexOf(address: InternetAddress): number;
    insert(index: number, address: InternetAddress): void;
    removeAt(index: number): void;
    add(address: InternetAddress): void;
    addRange(addresses: InternetAddress[]): void;
    clear(): void;
    contains(address: InternetAddress): boolean;
    copyTo(array: InternetAddress[], arrayIndex: number): void;
    remove(address: InternetAddress): boolean;
    compareTo(other: InternetAddressList): number;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, length: number, addresses: InternetAddressList): boolean;
    tryParse(buffer: number[], startIndex: number, length: number, addresses: InternetAddressList): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, addresses: InternetAddressList): boolean;
    tryParse(buffer: number[], startIndex: number, addresses: InternetAddressList): boolean;
    tryParse(options: ParserOptions, buffer: number[], addresses: InternetAddressList): boolean;
    tryParse(buffer: number[], addresses: InternetAddressList): boolean;
    tryParse(options: ParserOptions, text: string, addresses: InternetAddressList): boolean;
    tryParse(text: string, addresses: InternetAddressList): boolean;
    parse(options: ParserOptions, buffer: number[], startIndex: number, length: number): InternetAddressList;
    parse(buffer: number[], startIndex: number, length: number): InternetAddressList;
    parse(options: ParserOptions, buffer: number[], startIndex: number): InternetAddressList;
    parse(buffer: number[], startIndex: number): InternetAddressList;
    parse(options: ParserOptions, buffer: number[]): InternetAddressList;
    parse(buffer: number[]): InternetAddressList;
    parse(options: ParserOptions, text: string): InternetAddressList;
    parse(text: string): InternetAddressList;
  }

  interface MessageIdList extends Array<string> {
    item: string;
    count: number;
    isReadOnly: boolean;
    clone(): MessageIdList;
    indexOf(messageId: string): number;
    insert(index: number, messageId: string): void;
    removeAt(index: number): void;
    add(messageId: string): void;
    addRange(items: string[]): void;
    clear(): void;
    contains(messageId: string): boolean;
    copyTo(array: string[], arrayIndex: number): void;
    remove(messageId: string): boolean;
  }

  interface MimeEntity {
    headers: HeaderList;
    contentDisposition: ContentDisposition;
    contentType: ContentType;
    contentBase: any;
    contentLocation: any;
    contentId: string;
    isAttachment: boolean;
    accept(visitor: MimeVisitor): void;
    prepare(constraint: EncodingConstraint, maxLineLength?: number): void;
    writeTo(options: FormatOptions, stream: any, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(options: FormatOptions, stream: any, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, cancellationToken?: any): any;
    writeTo(stream: any, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(stream: any, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(stream: any, cancellationToken?: any): void;
    writeToAsync(stream: any, cancellationToken?: any): any;
    writeTo(options: FormatOptions, fileName: string, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, fileName: string, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(options: FormatOptions, fileName: string, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, fileName: string, cancellationToken?: any): any;
    writeTo(fileName: string, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(fileName: string, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(fileName: string, cancellationToken?: any): void;
    writeToAsync(fileName: string, cancellationToken?: any): any;
    dispose(): void;
    load(options: ParserOptions, stream: any, persistent: boolean, cancellationToken?: any): MimeEntity;
    loadAsync(options: ParserOptions, stream: any, persistent: boolean, cancellationToken?: any): any;
    load(options: ParserOptions, stream: any, cancellationToken?: any): MimeEntity;
    loadAsync(options: ParserOptions, stream: any, cancellationToken?: any): any;
    load(stream: any, persistent: boolean, cancellationToken?: any): MimeEntity;
    loadAsync(stream: any, persistent: boolean, cancellationToken?: any): any;
    load(stream: any, cancellationToken?: any): MimeEntity;
    loadAsync(stream: any, cancellationToken?: any): any;
    load(options: ParserOptions, fileName: string, cancellationToken?: any): MimeEntity;
    loadAsync(options: ParserOptions, fileName: string, cancellationToken?: any): any;
    load(fileName: string, cancellationToken?: any): MimeEntity;
    loadAsync(fileName: string, cancellationToken?: any): any;
    load(options: ParserOptions, contentType: ContentType, content: any, cancellationToken?: any): MimeEntity;
    loadAsync(options: ParserOptions, contentType: ContentType, content: any, cancellationToken?: any): any;
    load(contentType: ContentType, content: any, cancellationToken?: any): MimeEntity;
    loadAsync(contentType: ContentType, content: any, cancellationToken?: any): any;
    getText(): string;
    isAttachment(): boolean;
  }

  interface InternetAddress {
    encoding: any;
    name: string;
    clone(): InternetAddress;
    compareTo(other: InternetAddress): number;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, length: number, address: InternetAddress): boolean;
    tryParse(buffer: number[], startIndex: number, length: number, address: InternetAddress): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, address: InternetAddress): boolean;
    tryParse(buffer: number[], startIndex: number, address: InternetAddress): boolean;
    tryParse(options: ParserOptions, buffer: number[], address: InternetAddress): boolean;
    tryParse(buffer: number[], address: InternetAddress): boolean;
    tryParse(options: ParserOptions, text: string, address: InternetAddress): boolean;
    tryParse(text: string, address: InternetAddress): boolean;
    parse(options: ParserOptions, buffer: number[], startIndex: number, length: number): InternetAddress;
    parse(buffer: number[], startIndex: number, length: number): InternetAddress;
    parse(options: ParserOptions, buffer: number[], startIndex: number): InternetAddress;
    parse(buffer: number[], startIndex: number): InternetAddress;
    parse(options: ParserOptions, buffer: number[]): InternetAddress;
    parse(buffer: number[]): InternetAddress;
    parse(options: ParserOptions, text: string): InternetAddress;
    parse(text: string): InternetAddress;
  }

  interface MailboxAddress {
  }

  interface DomainList extends Array<string> {
    item: string;
    count: number;
    isReadOnly: boolean;
    indexOf(domain: string): number;
    insert(index: number, domain: string): void;
    removeAt(index: number): void;
    add(domain: string): void;
    clear(): void;
    contains(domain: string): boolean;
    copyTo(array: string[], arrayIndex: number): void;
    remove(domain: string): boolean;
    tryParse(text: string, route: DomainList): boolean;
  }

  type NewLineFormat = 'Unix' | 'Dos' | 'Mixed';

  type HeaderId = 'AcceptLanguage' | 'AdHoc' | 'AlternateRecipient' | 'ApparentlyTo' | 'Approved' | 'ArcAuthenticationResults' | 'ArcMessageSignature' | 'ArcSeal' | 'Archive' | 'ArchivedAt' | 'Article' | 'AuthenticationResults' | 'Autocrypt' | 'AutocryptGossip' | 'AutocryptSetupMessage' | 'Autoforwarded' | 'AutoSubmitted' | 'Autosubmitted' | 'Base' | 'Bcc' | 'Body' | 'Bytes' | 'Cc' | 'Comments' | 'ContentAlternative' | 'ContentBase' | 'ContentClass' | 'ContentDescription' | 'ContentDisposition' | 'ContentDuration' | 'ContentFeatures' | 'ContentId' | 'ContentIdentifier' | 'ContentLanguage' | 'ContentLength' | 'ContentLocation' | 'ContentMd5' | 'ContentReturn' | 'ContentTransferEncoding' | 'ContentTranslationType' | 'ContentType' | 'Control' | 'Conversion' | 'ConversionWithLoss' | 'Date' | 'DateReceived' | 'DeferredDelivery' | 'DeliveryDate' | 'DiscloseRecipients' | 'DispositionNotificationOptions' | 'DispositionNotificationTo' | 'Distribution' | 'DkimSignature' | 'DomainKeySignature' | 'Encoding' | 'Encrypted' | 'Expires' | 'ExpiryDate' | 'FollowupTo' | 'From' | 'GenerateDeliveryReport' | 'Importance' | 'InjectionDate' | 'InjectionInfo' | 'InReplyTo' | 'Keywords' | 'Language' | 'LatestDeliveryTime' | 'Lines' | 'ListArchive' | 'ListHelp' | 'ListId' | 'ListOwner' | 'ListPost' | 'ListSubscribe' | 'ListUnsubscribe' | 'ListUnsubscribePost' | 'MessageId' | 'MimeVersion' | 'Newsgroups' | 'NntpPostingHost' | 'Organization' | 'OriginalFrom' | 'OriginalMessageId' | 'OriginalRecipient' | 'OriginalReturnAddress' | 'OriginalSubject' | 'Path' | 'Precedence' | 'PreventNonDeliveryReport' | 'Priority' | 'Received' | 'ReceivedSPF' | 'References' | 'RelayVersion' | 'ReplyBy' | 'ReplyTo' | 'RequireRecipientValidSince' | 'ResentBcc' | 'ResentCc' | 'ResentDate' | 'ResentFrom' | 'ResentMessageId' | 'ResentReplyTo' | 'ResentSender' | 'ResentTo' | 'ReturnPath' | 'ReturnReceiptTo' | 'SeeAlso' | 'Sender' | 'Sensitivity' | 'Solicitation' | 'Status' | 'Subject' | 'Summary' | 'Supersedes' | 'TLSRequired' | 'To' | 'UserAgent' | 'X400ContentIdentifier' | 'X400ContentReturn' | 'X400ContentType' | 'X400MTSIdentifier' | 'X400Originator' | 'X400Received' | 'X400Recipients' | 'X400Trace' | 'XMailer' | 'XMSMailPriority' | 'XPriority' | 'XStatus' | 'Unknown';

  type ParameterEncodingMethod = 'Default' | 'Rfc2231' | 'Rfc2047';

  interface MimePart extends MimeEntity {
    contentDescription: string;
    contentDuration?: number;
    contentMd5: string;
    contentTransferEncoding: ContentEncoding;
    fileName: string;
    content: IMimeContent;
    headers: HeaderList;
    contentDisposition: ContentDisposition;
    contentType: ContentType;
    contentBase: any;
    contentLocation: any;
    contentId: string;
    isAttachment: boolean;
    accept(visitor: MimeVisitor): void;
    getBestEncoding(constraint: EncodingConstraint, cancellationToken?: any): ContentEncoding;
    getBestEncoding(constraint: EncodingConstraint, maxLineLength: number, cancellationToken?: any): ContentEncoding;
    computeContentMd5(): string;
    verifyContentMd5(): boolean;
    prepare(constraint: EncodingConstraint, maxLineLength?: number): void;
    writeTo(options: FormatOptions, stream: any, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(options: FormatOptions, stream: any, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, stream: any, cancellationToken?: any): any;
    writeTo(stream: any, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(stream: any, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(stream: any, cancellationToken?: any): void;
    writeToAsync(stream: any, cancellationToken?: any): any;
    writeTo(options: FormatOptions, fileName: string, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, fileName: string, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(options: FormatOptions, fileName: string, cancellationToken?: any): void;
    writeToAsync(options: FormatOptions, fileName: string, cancellationToken?: any): any;
    writeTo(fileName: string, contentOnly: boolean, cancellationToken?: any): void;
    writeToAsync(fileName: string, contentOnly: boolean, cancellationToken?: any): any;
    writeTo(fileName: string, cancellationToken?: any): void;
    writeToAsync(fileName: string, cancellationToken?: any): any;
    dispose(): void;
  }

  type RfcComplianceMode = 'Loose' | 'Strict' | 'Looser';

  interface Header {
    offset?: number;
    field: string;
    id: HeaderId;
    rawField: number[];
    rawValue: number[];
    value: string;
    clone(): Header;
    getValue(encoding: any): string;
    getValue(charset: string): string;
    setValue(format: FormatOptions, encoding: any, value: string): void;
    setValue(encoding: any, value: string): void;
    setValue(format: FormatOptions, charset: string, value: string): void;
    setValue(charset: string, value: string): void;
    setRawValue(value: number[]): void;
    unfold(text: string): string;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, length: number, header: Header): boolean;
    tryParse(buffer: number[], startIndex: number, length: number, header: Header): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, header: Header): boolean;
    tryParse(buffer: number[], startIndex: number, header: Header): boolean;
    tryParse(options: ParserOptions, buffer: number[], header: Header): boolean;
    tryParse(buffer: number[], header: Header): boolean;
    tryParse(options: ParserOptions, text: string, header: Header): boolean;
    tryParse(text: string, header: Header): boolean;
  }

  interface InternetAddressList {
  }

  interface ContentType {
    mediaType: string;
    mediaSubtype: string;
    parameters: ParameterList;
    boundary: string;
    charset: string;
    charsetEncoding: any;
    format: string;
    mimeType: string;
    name: string;
    clone(): ContentType;
    isMimeType(mediaType: string, mediaSubtype: string): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, length: number, type: ContentType): boolean;
    tryParse(buffer: number[], startIndex: number, length: number, type: ContentType): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, type: ContentType): boolean;
    tryParse(buffer: number[], startIndex: number, type: ContentType): boolean;
    tryParse(options: ParserOptions, buffer: number[], type: ContentType): boolean;
    tryParse(buffer: number[], type: ContentType): boolean;
    tryParse(options: ParserOptions, text: string, type: ContentType): boolean;
    tryParse(text: string, type: ContentType): boolean;
    parse(options: ParserOptions, buffer: number[], startIndex: number, length: number): ContentType;
    parse(buffer: number[], startIndex: number, length: number): ContentType;
    parse(options: ParserOptions, buffer: number[], startIndex: number): ContentType;
    parse(buffer: number[], startIndex: number): ContentType;
    parse(options: ParserOptions, buffer: number[]): ContentType;
    parse(buffer: number[]): ContentType;
    parse(options: ParserOptions, text: string): ContentType;
    parse(text: string): ContentType;
  }

  interface ContentDisposition {
    disposition: string;
    isAttachment: boolean;
    parameters: ParameterList;
    fileName: string;
    creationDate?: any;
    modificationDate?: any;
    readDate?: any;
    size?: number;
    clone(): ContentDisposition;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, length: number, disposition: ContentDisposition): boolean;
    tryParse(buffer: number[], startIndex: number, length: number, disposition: ContentDisposition): boolean;
    tryParse(options: ParserOptions, buffer: number[], startIndex: number, disposition: ContentDisposition): boolean;
    tryParse(buffer: number[], startIndex: number, disposition: ContentDisposition): boolean;
    tryParse(options: ParserOptions, buffer: number[], disposition: ContentDisposition): boolean;
    tryParse(buffer: number[], disposition: ContentDisposition): boolean;
    tryParse(options: ParserOptions, text: string, disposition: ContentDisposition): boolean;
    tryParse(text: string, disposition: ContentDisposition): boolean;
    parse(options: ParserOptions, buffer: number[], startIndex: number, length: number): ContentDisposition;
    parse(buffer: number[], startIndex: number, length: number): ContentDisposition;
    parse(options: ParserOptions, buffer: number[], startIndex: number): ContentDisposition;
    parse(buffer: number[], startIndex: number): ContentDisposition;
    parse(options: ParserOptions, buffer: number[]): ContentDisposition;
    parse(buffer: number[]): ContentDisposition;
    parse(options: ParserOptions, text: string): ContentDisposition;
    parse(text: string): ContentDisposition;
  }

  interface InternetAddress {
  }

  interface DomainList {
  }

  type ContentEncoding = 'Default' | 'SevenBit' | 'EightBit' | 'Binary' | 'Base64' | 'QuotedPrintable' | 'UUEncode';

  interface IMimeContent {
    encoding: ContentEncoding;
    newLineFormat?: NewLineFormat;
    stream: any;
    open(): any;
    decodeTo(stream: any, cancellationToken?: any): void;
    decodeToAsync(stream: any, cancellationToken?: any): any;
    writeTo(stream: any, cancellationToken?: any): void;
    writeToAsync(stream: any, cancellationToken?: any): any;
  }

  interface Header {
  }

  interface ContentType {
  }

  interface ParameterList extends Array<Parameter> {
    item: string;
    count: number;
    isReadOnly: boolean;
    add(name: string, value: string): void;
    add(encoding: any, name: string, value: string): void;
    add(charset: string, name: string, value: string): void;
    contains(name: string): boolean;
    indexOf(name: string): number;
    insert(index: number, name: string, value: string): void;
    remove(name: string): boolean;
    tryGetValue(name: string, param: Parameter): boolean;
    tryGetValue(name: string, value: any): boolean;
    add(param: Parameter): void;
    clear(): void;
    contains(param: Parameter): boolean;
    copyTo(array: Parameter[], arrayIndex: number): void;
    remove(param: Parameter): boolean;
    indexOf(param: Parameter): number;
    insert(index: number, param: Parameter): void;
    removeAt(index: number): void;
  }

  interface ContentDisposition {
  }

  interface Parameter {
  }

  interface Parameter {
    name: string;
    encoding: any;
    encodingMethod: ParameterEncodingMethod;
    alwaysQuote: boolean;
    value: string;
    clone(): Parameter;
  }

}
declare namespace Amazon.Runtime {
  interface ResponseMetadata {
    requestId: string;
    metadata: any;
  }

  interface AmazonWebServiceResponse {
    responseMetadata: ResponseMetadata;
    contentLength: number;
    httpStatusCode: any;
  }

}
declare namespace Kooboo.IndexedDB.Dynamic.Converter {
  interface ObjectConverter {
    fields: Kooboo.IndexedDB.Dynamic.FieldConverter[];
    toBytes(preData: Record<string, any>): number[];
    fromBytes(bytes: number[]): any;
    fromBytes(bytes: number[]): any;
  }

}
declare namespace Kooboo.IndexedDB.BPlusTree {
  interface IBPlusTreeObject {
    bPlusTreeLen: number;
    skipValueBlock: boolean;
    setBPlusBytes(bytes: number[]): void;
    getBPlusBytes(): number[];
  }

}
declare namespace Kooboo.Sites.Authorization {
  type EnumUserRole = 'Administrator' | 'SiteMaster' | 'Developer' | 'ContentManager';

}
declare namespace Kooboo.IndexedDB.Schedule {
  type RepeatFrequence = 'Day' | 'Hour' | 'Minutes' | 'Week' | 'Month' | 'Second';

}
declare namespace Kooboo.Mail.Imap {
  interface SelectFolder {
    stat: Kooboo.Mail.Models.MessageStat;
    folderId: number;
    addressId: number;
    folder: string;
    eXPUNGE(): number[];
  }

}
declare namespace MimeKit.Text {
  type TextFormat = 'Plain' | 'Text' | 'Flowed' | 'Html' | 'Enriched' | 'CompressedRichText' | 'RichText';

}
declare namespace MimeKit.Cryptography {
  interface CryptographyContext {
    prepareBeforeSigning: boolean;
    signatureProtocol: string;
    encryptionProtocol: string;
    keyExchangeProtocol: string;
    enabledEncryptionAlgorithms: EncryptionAlgorithm[];
    enabledDigestAlgorithms: DigestAlgorithm[];
    enable(algorithm: EncryptionAlgorithm): void;
    disable(algorithm: EncryptionAlgorithm): void;
    isEnabled(algorithm: EncryptionAlgorithm): boolean;
    enable(algorithm: DigestAlgorithm): void;
    disable(algorithm: DigestAlgorithm): void;
    isEnabled(algorithm: DigestAlgorithm): boolean;
    supports(protocol: string): boolean;
    getDigestAlgorithmName(micalg: DigestAlgorithm): string;
    getDigestAlgorithm(micalg: string): DigestAlgorithm;
    canSign(signer: MimeKit.MailboxAddress, cancellationToken?: any): boolean;
    canSignAsync(signer: MimeKit.MailboxAddress, cancellationToken?: any): any;
    canEncrypt(mailbox: MimeKit.MailboxAddress, cancellationToken?: any): boolean;
    canEncryptAsync(mailbox: MimeKit.MailboxAddress, cancellationToken?: any): any;
    sign(signer: MimeKit.MailboxAddress, digestAlgo: DigestAlgorithm, content: any, cancellationToken?: any): MimeKit.MimePart;
    signAsync(signer: MimeKit.MailboxAddress, digestAlgo: DigestAlgorithm, content: any, cancellationToken?: any): any;
    verify(content: any, signatureData: any, cancellationToken?: any): DigitalSignatureCollection;
    verifyAsync(content: any, signatureData: any, cancellationToken?: any): any;
    encrypt(recipients: MimeKit.MailboxAddress[], content: any, cancellationToken?: any): MimeKit.MimePart;
    encryptAsync(recipients: MimeKit.MailboxAddress[], content: any, cancellationToken?: any): any;
    decrypt(encryptedData: any, cancellationToken?: any): MimeKit.MimeEntity;
    decryptAsync(encryptedData: any, cancellationToken?: any): any;
    import(stream: any, cancellationToken?: any): void;
    importAsync(stream: any, cancellationToken?: any): any;
    export(mailboxes: MimeKit.MailboxAddress[], cancellationToken?: any): MimeKit.MimePart;
    exportAsync(mailboxes: MimeKit.MailboxAddress[], cancellationToken?: any): any;
    dispose(): void;
    create(protocol: string): CryptographyContext;
    register(type: any): void;
    register(factory: ()=>MimeKit.Cryptography.SecureMimeContext): void;
    register(factory: ()=>MimeKit.Cryptography.OpenPgpContext): void;
  }

  type DigestAlgorithm = 'None' | 'MD5' | 'Sha1' | 'RipeMD160' | 'DoubleSha' | 'MD2' | 'Tiger192' | 'Haval5160' | 'Sha256' | 'Sha384' | 'Sha512' | 'Sha224' | 'MD4';

  type EncryptionAlgorithm = 'Aes128' | 'Aes192' | 'Aes256' | 'Camellia128' | 'Camellia192' | 'Camellia256' | 'Cast5' | 'Des' | 'TripleDes' | 'Idea' | 'Blowfish' | 'Twofish' | 'RC240' | 'RC264' | 'RC2128' | 'Seed';

  interface DigitalSignatureCollection extends Array<IDigitalSignature> {
    count: number;
    item?: IDigitalSignature;
    contains(value: IDigitalSignature): boolean;
    copyTo(array: IDigitalSignature[], index: number): void;
    indexOf(value: IDigitalSignature): number;
  }

  interface IDigitalSignature {
    signerCertificate: IDigitalCertificate;
    publicKeyAlgorithm: PublicKeyAlgorithm;
    digestAlgorithm: DigestAlgorithm;
    creationDate: Date;
    verify(): boolean;
    verify(verifySignatureOnly: boolean): boolean;
  }

  interface IDigitalCertificate {
    publicKeyAlgorithm: PublicKeyAlgorithm;
    creationDate: Date;
    expirationDate: Date;
    fingerprint: string;
    email: string;
    name: string;
  }

  type PublicKeyAlgorithm = 'None' | 'RsaGeneral' | 'RsaEncrypt' | 'RsaSign' | 'ElGamalEncrypt' | 'Dsa' | 'EllipticCurve' | 'EllipticCurveDsa' | 'ElGamalGeneral' | 'DiffieHellman' | 'EdwardsCurveDsa';

}
declare namespace Kooboo.IndexedDB.BTree {
  interface ItemCollection extends Array<number> {
  }

  interface KeyBytesCollection {
  }

}
declare namespace Kooboo.IndexedDB.Query {
  type Comparer = 'EqualTo' | 'GreaterThan' | 'GreaterThanOrEqual' | 'LessThan' | 'LessThanOrEqual' | 'NotEqualTo' | 'StartWith' | 'Contains';

  type DateTimeScope = 'nondefined' | 'day' | 'month' | 'year' | 'minute' | 'second' | 'millionSecond';

}
declare namespace Kooboo.IndexedDB.Condition.Expression {
  interface Node {
    nodeType: Kooboo.IndexedDB.Condition.NodeType;
    getNodes(): Node[];
    and(left: Node, right: FilterNode): Node;
  }

  interface FilterNode extends Node {
    property: string;
    comparer: Kooboo.IndexedDB.Query.Comparer;
    value: ValueNode;
    nodeType: Kooboo.IndexedDB.Condition.NodeType;
    getNodes(): Node[];
  }

  interface ValueNode extends Node {
    nodeType: Kooboo.IndexedDB.Condition.NodeType;
    raw: string;
    value: any;
    valueBytes: number[];
    type: any;
    length: number;
    timeScope: Kooboo.IndexedDB.Query.DateTimeScope;
    boolean: boolean;
    getNodes(): Node[];
  }

}
declare namespace MimeKit.Encodings {
  interface IPunycode {
    encode(domain: string): string;
    encode(domain: string, index: number): string;
    encode(domain: string, index: number, count: number): string;
    decode(domain: string): string;
    decode(domain: string, index: number): string;
    decode(domain: string, index: number, count: number): string;
  }

}
declare namespace Kooboo.IndexedDB.Columns {
  interface IColumn {
    fieldName: string;
    dataType: any;
    length: number;
    relativePosition: number;
  }

}
declare namespace Kooboo.IndexedDB.Condition {
  type NodeType = 'Filter' | 'Binary' | 'Value';

}

declare namespace KMarket {
  interface Anthropic_Message {
    /** Available options: user, assistant */
    role?: string;
    content?: Anthropic_RequestContent[];
  }

  interface Anthropic_MessageRequest {
    /** Using self api key */
    apiKey?: string;
    /** The model that will complete your prompt.
See models for additional details and options.
claude-opus-4-20250514
claude-sonnet-4-20250514
claude-3-7-sonnet-20250219
claude-3-5-haiku-20241022
claude-3-5-sonnet-20241022
claude-3-5-sonnet-20240620
claude-3-haiku-20240307 */
    model?: string;
    /**  Our models are trained to operate on alternating user and assistant conversational turns. When creating a new Message, you specify the prior conversational turns with the messages parameter, and the model then generates the next Message in the conversation. Consecutive user or assistant turns in your request will be combined into a single turn.
Each input message must be an object with a role and content. You can specify a single user-role message, or you can include multiple user and assistant messages.
 If the final message uses the assistant role, the response content will continue immediately from the content in that message. This can be used to constrain part of the model's response. */
    messages?: Anthropic_Message[];
    /** The maximum number of tokens to generate before stopping.
Note that our models may stop before reaching this maximum. This parameter only specifies the absolute maximum number of tokens to generate.
Different models have different maximum values for this parameter. See models for details. */
    maxTokens: number;
    /** Custom text sequences that will cause the model to stop generating.
Our models will normally stop when they have naturally completed their turn, which will result in a response stop_reason of "end_turn".
If you want the model to stop generating when it encounters custom strings of text, you can use the stop_sequences parameter. If the model encounters one of the custom sequences, the response stop_reason value will be "stop_sequence" and the response stop_sequence value will contain the matched stop sequence. */
    stopSequences?: string[];
    /** A system prompt is a way of providing context and instructions to Claude, such as specifying a particular goal or role. See our guide to system prompts. */
    system?: string;
    /** Amount of randomness injected into the response.
Defaults to 1.0. Ranges from 0.0 to 1.0. Use temperature closer to 0.0 for analytical / multiple choice, and closer to 1.0 for creative and generative tasks.
Note that even with temperature of 0.0, the results will not be fully deterministic. */
    temperature: number;
    toolChoice: Anthropic_ToolChoice;
    /** Definitions of tools that the model may use.
If you include tools in your API request, the model may return tool_use content blocks that represent the model's use of those tools. You can then run those tools using the tool input generated by the model and then optionally return results back to the model using tool_result content blocks.
There are two types of tools: client tools and server tools. The behavior described below applies to client tools. For server tools, see their individual documentation as each has its own behavior (e.g., the web search tool). */
    tools?: Anthropic_Tool[];
  }

  interface Anthropic_MessageResponse {
    id?: string;
    /** Available options: message */
    type?: string;
    /** Available options: assistant */
    role?: string;
    content?: Anthropic_ResponseContent[];
    model?: string;
    /** The reason that we stopped.
This may be one the following values:
"end_turn": the model reached a natural stopping point
"max_tokens": we exceeded the requested max_tokens or the model's maximum
"stop_sequence": one of your provided custom stop_sequences was generated
"tool_use": the model invoked one or more tools
"pause_turn": we paused a long-running turn. You may provide the response back as-is in a subsequent request to let the model continue.
"refusal": when streaming classifiers intervene to handle potential policy violations
In non-streaming mode this value is always non-null. In streaming mode, it is null in the message_start event and non-null otherwise. */
    stopReason?: string;
    /** Which custom stop sequence was generated, if any.
This value will be a non-null string if one of your custom stop sequences was generated. */
    stopSequence?: string;
    usage: Anthropic_Usage;
  }

  interface Anthropic_RequestContent {
    /** Available options: text tool_use tool_result */
    type?: string;
    /** Provide when type is tool_use */
    id?: string;
    /** Provide when type is tool_use */
    name?: string;
    /** Provide when type is text */
    text?: string;
    /** Provide when type is tool_result */
    toolUseId?: string;
    /** Provide when type is tool_result */
    content?: string;
    /** Provide when type is tool_result */
    isError?: boolean;
    input: System_Text_Json_Nodes_JsonNode;
  }

  interface Anthropic_ResponseContent {
    /** Available options: text tool_use */
    type?: string;
    /** Provide when type is tool_use */
    id?: string;
    /** Provide when type is tool_use */
    input?: any;
    /** Provide when type is tool_use */
    name?: string;
    /** Provide when type is text */
    text?: string;
  }

  interface Anthropic_Tool {
    /** Name of the tool. */
    name?: string;
    /** Available options: custom */
    type?: string;
    /** Optional, but strongly-recommended description of the tool. */
    description?: string;
    /** JSON schema for the tool input shape that the model will produce in tool_use output content blocks. */
    inputSchema?: any;
  }

  interface Anthropic_ToolChoice {
    /** Available options: auto any tool none */
    type?: string;
    /** Provide when type is tool */
    name?: string;
    /** Whether to disable parallel tool use.
Defaults to false. If set to true, the model will output at most one tool use. */
    disableParallelToolUse: boolean;
  }

  interface Anthropic_Usage {
    /** The number of input tokens used to create the cache entry. */
    cacheCreationInputTokens: number;
    /** The number of input tokens read from the cache. */
    cacheReadInputTokens: number;
    /** The number of input tokens which were used. */
    inputTokens: number;
    /** The number of output tokens which were used. */
    outputTokens: number;
  }

  interface Client {
    id?: string;
    token?: string;
    forbidden: boolean;
    forbiddenReason?: string;
    lastActivity: Date;
  }

  interface ClientBilling_Response {
    count: number;
    clientId?: string;
  }

  interface ClientInvokeRecord_Response {
    service?: string;
    methods?: string;
    count: number;
    clientId?: string;
  }

  interface Controllers_ClientController_ChangeStateModel {
    id?: string;
    forbidden: boolean;
    reason?: string;
  }

  interface Controllers_CurrencyController_TransformResult {
    money?: string;
    rate?: string;
  }

  interface Controllers_InvokeRecordController_Endpoint {
    service?: string;
    method?: string;
  }

  interface ImageClassify_ImageClassifyRequest {
    /** Base64 image string */
    image?: string;
  }

  interface Kooboo_ApiMarket_AirTicketResDTO {
    errorCode: number;
    errorMsg?: string;
    /** 唯一的log id，用于问题定位 */
    log_id: number;
    words_result: Kooboo_ApiMarket_AirTicketWords_result;
    /** 识别结果数 */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_AirTicketWords_result {
    /** 座位等级 */
    class?: string;
    /** 销售单位号 */
    agent_code?: string;
    /** 免费行李 */
    allow?: string;
    /** 承运人 */
    carrier?: string;
    /** 验证码 */
    ck?: string;
    /**  */
    date?: string;
    /** 目的站 */
    destination_station?: string;
    /** 民航发展基金/基建费 */
    dev_fund?: string;
    /** 签注 */
    endorsement?: string;
    /** 票价 */
    fare?: string;
    /** 客票级别 */
    fare_basis?: string;
    /** 航班号 */
    flight?: string;
    /** 燃油附加费 */
    fuel_surcharge?: string;
    /**  */
    id_num?: string;
    /** 保险费 */
    insurance?: string;
    /** 订票渠道 */
    issued_by?: string;
    /** 填开日期 */
    issued_date?: string;
    /** 郭达 */
    name?: string;
    /** 其他税费 */
    other_tax?: string;
    /** 印刷序号 */
    serial_number?: string;
    /** 始发站 */
    starting_station?: string;
    /** 电子客票号码 */
    ticket_number?: string;
    /** 合计金额 */
    ticket_rates?: string;
    /**  */
    time?: string;
  }

  interface Kooboo_ApiMarket_AnimalResDTO {
    /**  */
    log_id: number;
    /**  */
    result?: Kooboo_ApiMarket_imageClass_ResultItem[];
  }

  interface Kooboo_ApiMarket_AsrReqDTO {
    /** 可选值:1537 -普通话(纯中文识别), 1737 - 英语 ,1637 -粤语,1837 -四川话, 1936 -普通话远场	
默认值：1537 */
    dev_pid?: number;
    /** 语音文件base64字符串 */
    base64?: string;
    /** 语音文件格式，pcm 或者 wav 或者 amr。不区分大小写。推荐pcm文件 */
    format?: string;
    /** 采样率，16000、8000，固定值 */
    rate: number;
  }

  interface Kooboo_ApiMarket_AsrResDTO {
    errorCode: number;
    errorMsg?: string;
    corpus_no?: string;
    err_msg?: string;
    err_no: number;
    result?: string[];
    sn?: string;
  }

  interface Kooboo_ApiMarket_BaiduServer_CallFunction {
    name?: string;
    arguments?: string;
  }

  interface Kooboo_ApiMarket_BaiduServer_Function {
    description?: string;
    name?: string;
    parameters?: any;
  }

  interface Kooboo_ApiMarket_BaiduServer_Message {
    role: string;
    content: string;
    tool_call_id?: string;
    tool_calls?: Kooboo_ApiMarket_BaiduServer_ToolCall[];
  }

  interface Kooboo_ApiMarket_BaiduServer_QianfanReqDTO {
    /** The messages to generate chat completions */
    messages: Kooboo_ApiMarket_BaiduServer_Message[];
    /** you apikey */
    apikey: string;
    /** What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. */
    temperature: number;
    /** How many chat completion choices to generate for each input message. */
    n: number;
    /** The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens). */
    max_token: number;
    /** An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. */
    top_p: number;
    /** deepseek-chat deepseek-reasoner */
    model?: string;
    tools?: Kooboo_ApiMarket_BaiduServer_Tool[];
  }

  interface Kooboo_ApiMarket_BaiduServer_Tool {
    type?: string;
    function: Kooboo_ApiMarket_BaiduServer_Function;
  }

  interface Kooboo_ApiMarket_BaiduServer_ToolCall {
    id?: string;
    type?: string;
    function: Kooboo_ApiMarket_BaiduServer_CallFunction;
  }

  interface Kooboo_ApiMarket_BaiduSubmitResDTO {
    /** 今日剩余提交数量 */
    remain: number;
    /** 是否成功 */
    success: number;
  }

  interface Kooboo_ApiMarket_Baike_info {
    /**  */
    baike_url?: string;
    /**  */
    description?: string;
  }

  interface Kooboo_ApiMarket_BankCardResDTO {
    errorCode: number;
    errorMsg?: string;
    /** Request ID, random number, unique. */
    log_id: number;
    result: Kooboo_ApiMarket_BankCardResult;
  }

  interface Kooboo_ApiMarket_BankCardResult {
    /** 6259 6508 9111
银行卡卡号 */
    bank_card_number?: string;
    /** Type of bank card, 0: cannot identify; 1: debit card; 2. Credit Card
银行卡类型，0:不能识别; 1: 借记卡; 2: 信用卡 */
    bank_card_type: number;
    /** 银行名 */
    bank_name?: string;
  }

  interface Kooboo_ApiMarket_BasicResult {
    body?: string;
    headers?: string[];
    code: number;
    status?: string;
    contentLength: number;
  }

  interface Kooboo_ApiMarket_BillWords_resultItem {
    location: Kooboo_ApiMarket_Location;
    probability: Kooboo_ApiMarket_Probability;
    chars?: Kooboo_ApiMarket_Chars[];
    words?: string;
  }

  interface Kooboo_ApiMarket_BusinessLicenseResDTO {
    /**  */
    log_id: number;
    words_result: Kooboo_ApiMarket_BusinessLicenseWords_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_BusinessLicenseWords_result {
    address: Kooboo_ApiMarket_WordsMessage;
    certificateNumber: Kooboo_ApiMarket_WordsMessage;
    companyName: Kooboo_ApiMarket_WordsMessage;
    legalPerson: Kooboo_ApiMarket_WordsMessage;
    socialCreditCode: Kooboo_ApiMarket_WordsMessage;
    validity: Kooboo_ApiMarket_WordsMessage;
  }

  interface Kooboo_ApiMarket_Candidates {
    /**  */
    prob: number;
    /**  */
    word?: string;
  }

  interface Kooboo_ApiMarket_Chars {
    /**  */
    candidates?: Kooboo_ApiMarket_Candidates[];
    /**  */
    char?: string;
    location: Kooboo_ApiMarket_Location;
  }

  interface Kooboo_ApiMarket_ChatGPTBasics {
    /** You question */
    prompt: string;
  }

  interface Kooboo_ApiMarket_Codes_resultItem {
    /**  */
    text?: string[];
    /**  */
    type?: string;
  }

  interface Kooboo_ApiMarket_CommandModel {
    body?: string;
  }

  interface Kooboo_ApiMarket_ContentItem {
    /**  */
    dst?: string;
    /**  */
    lineCount: number;
    /**  */
    pasteImg?: string;
    /**  */
    points?: Kooboo_ApiMarket_PointsItem[];
    /**  */
    rect?: string;
    /**  */
    src?: string;
  }

  interface Kooboo_ApiMarket_CovidTestAnalysisResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    logId: number;
    /**  */
    name?: Kooboo_ApiMarket_message[];
    /**  */
    testResult?: Kooboo_ApiMarket_message[];
    /**  */
    testTime?: Kooboo_ApiMarket_message[];
  }

  interface Kooboo_ApiMarket_Data {
    /**  */
    from?: string;
    /**  */
    content?: Kooboo_ApiMarket_ContentItem[];
    /**  */
    pasteImg?: string;
    /**  */
    sumDst?: string;
    /**  */
    sumSrc?: string;
    /**  */
    to?: string;
  }

  interface Kooboo_ApiMarket_DeepSeek_CallFunction {
    name?: string;
    arguments?: string;
  }

  interface Kooboo_ApiMarket_DeepSeek_Message {
    role: string;
    content: string;
    tool_call_id?: string;
    tool_calls?: Kooboo_ApiMarket_DeepSeek_ToolCall[];
  }

  interface Kooboo_ApiMarket_DeepSeek_ReqDTO {
    /** The messages to generate chat completions */
    messages: Kooboo_ApiMarket_DeepSeek_Message[];
    baseUrl?: string;
    /** you apikey */
    apikey: string;
    /** What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. */
    temperature: number;
    /** How many chat completion choices to generate for each input message. */
    n: number;
    /** The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens). */
    max_token: number;
    /** An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. */
    top_p: number;
    /** deepseek-chat deepseek-reasoner */
    model?: string;
    tools?: any[];
    tool_choice?: any;
  }

  interface Kooboo_ApiMarket_DeepSeek_ToolCall {
    id?: string;
    type?: string;
    function: Kooboo_ApiMarket_DeepSeek_CallFunction;
  }

  interface Kooboo_ApiMarket_DeepSeek_Turbo_Basics {
    /** The messages to generate chat completions */
    messages: Kooboo_ApiMarket_DeepSeek_Message[];
  }

  interface Kooboo_ApiMarket_Detail {
    riskLevel?: string;
    riskCode?: string;
    text?: string;
    position?: string;
  }

  interface Kooboo_ApiMarket_EditImageBasics {
    /** The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask. */
    image: string;
    /** A text description of the desired image(s). The maximum length is 1000 characters. */
    prompt: string;
  }

  interface Kooboo_ApiMarket_EditImageReqDTO {
    /** The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask. */
    image: string;
    /** A text description of the desired image(s). The maximum length is 1000 characters. */
    prompt: string;
    /** The number of images to generate. Must be between 1 and 10. */
    n: number;
    /** The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. */
    size: string;
    /** The format in which the generated images are returned. Must be one of url or b64_json. */
    response_format: string;
    /** You OpenAi ApiKey */
    apikey: string;
    /** An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where image should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as image. */
    mask?: string;
  }

  interface Kooboo_ApiMarket_FaceAddOrUpdateReqDTO {
    /** 可选值范围：NONE、LOW、NORMAL、HIGH
默认值：NONE
说明：图片质量控制 NONE: 不进行控制 LOW:较低的质量要求 NORMAL: 一般的质量要求 HIGH: 较高的质量要求 */
    quality_control?: string;
    /** 可选值范围：NONE、LOW、NORMAL、HIGH
默认值：NONE
说明：活体检测控制 NONE: 不进行控制 LOW:较低的活体要求(高通过率 低攻击拒绝率) NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率) HIGH: 较高的活体要求(高攻击拒绝率 低通过率) */
    liveness_control?: string;
    /** base64 image string */
    image: string;
    /** User id */
    user_id: string;
    user_info: string;
  }

  interface Kooboo_ApiMarket_FaceAddResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
    /**  */
    cached: number;
    result: Kooboo_ApiMarket_FaceAddResult;
    /**  */
    timestamp: number;
  }

  interface Kooboo_ApiMarket_FaceAddResult {
    /**  */
    face_token?: string;
    location: Kooboo_ApiMarket_Location;
  }

  interface Kooboo_ApiMarket_FaceBaseResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
  }

  interface Kooboo_ApiMarket_FaceGetListResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
    /**  */
    cached: number;
    result: Kooboo_ApiMarket_GetListRes_Result;
    /**  */
    timestamp: number;
  }

  interface Kooboo_ApiMarket_FaceGetUser_Result {
    /**  */
    user_list?: Kooboo_ApiMarket_User_listItem[];
  }

  interface Kooboo_ApiMarket_FaceGetUserResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
    /**  */
    cached: number;
    result: Kooboo_ApiMarket_FaceGetUser_Result;
    /**  */
    timestamp: number;
  }

  interface Kooboo_ApiMarket_FaceSearch_Result {
    /**  */
    face_token?: string;
    /**  */
    user_list?: Kooboo_ApiMarket_User_list[];
  }

  interface Kooboo_ApiMarket_FaceSearchResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
    /**  */
    timestamp: number;
    /**  */
    cached: number;
    result: Kooboo_ApiMarket_FaceSearch_Result;
  }

  interface Kooboo_ApiMarket_FaceSrearchReqDTO {
    /** 可选值范围：NONE、LOW、NORMAL、HIGH
默认值：NONE
说明：图片质量控制 NONE: 不进行控制 LOW:较低的质量要求 NORMAL: 一般的质量要求 HIGH: 较高的质量要求 */
    quality_control?: string;
    /** 可选值范围：NONE、LOW、NORMAL、HIGH
默认值：NONE
说明：活体检测控制 NONE: 不进行控制 LOW:较低的活体要求(高通过率 低攻击拒绝率) NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率) HIGH: 较高的活体要求(高攻击拒绝率 低通过率) */
    liveness_control?: string;
    /** Base64 image string */
    image: string;
    /** Match threshold (After the threshold is set, information about users whose score is lower than the threshold is not returned.) Max. 100 Min. 0 Default 80 */
    match_threshold?: number;
    /** The number of users returned after a lookup. Returns the users with the highest similarity. The default value is 1. A maximum of 50 users are returned. */
    max_user_num?: number;
    /** To compare a specific user, specify user_id. Face authentication function. */
    user_id?: string;
  }

  interface Kooboo_ApiMarket_FaceUpdate_Result {
    /**  */
    face_token?: string;
    location: Kooboo_ApiMarket_Location;
  }

  interface Kooboo_ApiMarket_FaceUpdateResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
    /**  */
    cached: number;
    result: Kooboo_ApiMarket_FaceUpdate_Result;
    /**  */
    timestamp: number;
  }

  interface Kooboo_ApiMarket_GeneralBillResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    direction: number;
    /**  */
    log_id: number;
    /**  */
    words_result?: Kooboo_ApiMarket_BillWords_resultItem[];
    /** 识别结果数，表示words_result的元素个数 */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_GeneralInvoiceResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    direction: number;
    /**  */
    log_id: number;
    words_result: Kooboo_ApiMarket_GeneralInvoiceWords_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_GeneralInvoiceWords_result {
    /**  */
    amountInFiguers?: string;
    /** 贰佰伍拾元整 */
    amountInWords?: string;
    /**  */
    checkCode?: string;
    /** 苏州 */
    city?: string;
    /**  */
    commodityAmount?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityName?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityNum?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityPrice?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityUnit?: string[];
    /** 其他服务 */
    industrySort?: string;
    /**  */
    invoiceCode?: string;
    /** 2017年08月02日 */
    invoiceDate?: string;
    /**  */
    invoiceNum?: string;
    /** 江苏省苏州市国家税务局通用机打发票 */
    invoiceType?: string;
    /**  */
    machineNum?: string;
    /** 江苏 */
    province?: string;
    /** 深圳商集企业服务有限公司 */
    purchaserName?: string;
    /**  */
    purchaserRegisterNum?: string;
    /** 苏州安顺企业服务有限公司 */
    sellerName?: string;
    /**  */
    sellerRegisterNum?: string;
    /**  */
    sheetNum?: string;
    /**  */
    time?: string;
    /**  */
    totalTax?: string;
  }

  interface Kooboo_ApiMarket_GenerationImage_Basics {
    /** A text description of the desired image(s). The maximum length is 1000 characters. */
    prompt: string;
  }

  interface Kooboo_ApiMarket_GenerationImageReqDTO {
    /** A text description of the desired image(s). The maximum length is 1000 characters. */
    prompt: string;
    /** The number of images to generate. Must be between 1 and 10. */
    n: number;
    /** The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. */
    size: string;
    /** The format in which the generated images are returned. Must be one of url or b64_json. */
    response_format: string;
    /** You OpenAi ApiKey */
    apikey: string;
  }

  interface Kooboo_ApiMarket_GetListRes_Face_listItem {
    /**  */
    ctime?: string;
    /**  */
    face_token?: string;
  }

  interface Kooboo_ApiMarket_GetListRes_Result {
    /**  */
    face_list?: Kooboo_ApiMarket_GetListRes_Face_listItem[];
  }

  interface Kooboo_ApiMarket_GroupGetUsers_Result {
    /**  */
    user_id_list?: string[];
  }

  interface Kooboo_ApiMarket_GroupGetUsersResDTO {
    error_code: number;
    /**  */
    error_msg?: string;
    /**  */
    log_id: number;
    /**  */
    cached: number;
    result: Kooboo_ApiMarket_GroupGetUsers_Result;
    /**  */
    timestamp: number;
  }

  interface Kooboo_ApiMarket_HandwritingResDTO {
    /**  */
    direction: number;
    /**  */
    log_id: number;
    /**  */
    words_result?: Kooboo_ApiMarket_HandwritingWords_resultItem[];
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_HandwritingWords_resultItem {
    location: Kooboo_ApiMarket_Location;
    chars?: Kooboo_ApiMarket_Chars[];
    probability: Kooboo_ApiMarket_Probability;
    /**  */
    words?: string;
  }

  interface Kooboo_ApiMarket_HealthCodeResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    idCar?: Kooboo_ApiMarket_message[];
    /**  */
    log_id: number;
    /**  */
    name?: Kooboo_ApiMarket_message[];
    /**  */
    state?: Kooboo_ApiMarket_message[];
    /**  */
    testResult?: Kooboo_ApiMarket_message[];
    /**  */
    testTime?: Kooboo_ApiMarket_message[];
    /**  */
    testTimeInterval?: Kooboo_ApiMarket_message[];
    /**  */
    updateTime?: Kooboo_ApiMarket_message[];
    /**  */
    vaccine?: Kooboo_ApiMarket_message[];
  }

  interface Kooboo_ApiMarket_IdCardBackResDTO {
    direction: number;
    risk_type?: string;
    words_result_num: number;
    idcard_number_type: number;
    image_status?: string;
    log_id: number;
    words_result: Kooboo_ApiMarket_IdCardBackWords_Result;
  }

  interface Kooboo_ApiMarket_IdCardBackWords_Result {
    expiryDate: Kooboo_ApiMarket_WordsMessage;
    issuingAuthority: Kooboo_ApiMarket_WordsMessage;
    issuingDate: Kooboo_ApiMarket_WordsMessage;
  }

  interface Kooboo_ApiMarket_IdCardFrontResDTO {
    direction: number;
    risk_type?: string;
    words_result_num: number;
    idcard_number_type: number;
    image_status?: string;
    log_id: number;
    words_result: Kooboo_ApiMarket_IdCardFrontWords_Result;
  }

  interface Kooboo_ApiMarket_IdCardFrontWords_Result {
    name: Kooboo_ApiMarket_WordsMessage;
    nation: Kooboo_ApiMarket_WordsMessage;
    addres: Kooboo_ApiMarket_WordsMessage;
    idnumber: Kooboo_ApiMarket_WordsMessage;
    birth: Kooboo_ApiMarket_WordsMessage;
    sex: Kooboo_ApiMarket_WordsMessage;
  }

  interface Kooboo_ApiMarket_Image_info {
    /**  */
    direction?: string;
  }

  interface Kooboo_ApiMarket_ImageAccurateResDTO {
    errorCode: number;
    errorMsg?: string;
    direction: number;
    /**  */
    log_id: number;
    /**  */
    words_result?: Kooboo_ApiMarket_ImageAccurateWords_resultItem[];
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_ImageAccurateWords_resultItem {
    /**  */
    words?: string;
  }

  interface Kooboo_ApiMarket_ImageAnalysisResDTO {
    errorCode: number;
    errorMsg?: string;
    direction: number;
    /**  */
    log_id: number;
    /**  */
    words_result?: Kooboo_ApiMarket_ImageAccurateWords_resultItem[];
    /**  */
    words_result_num: number;
    language: number;
  }

  interface Kooboo_ApiMarket_ImageApprovalReqDTO {
    /** need check image */
    image: string;
  }

  interface Kooboo_ApiMarket_imageClass_ResultItem {
    baike_info: Kooboo_ApiMarket_Baike_info;
    /** 叉角羚 */
    name?: string;
    /**  */
    score?: string;
  }

  interface Kooboo_ApiMarket_ImageContentApprovalResDTO {
    /** 成功返回 0 */
    code: number;
    /** 可能性 */
    unsafe: number;
  }

  interface Kooboo_ApiMarket_ImageDatum {
    url?: string;
  }

  interface Kooboo_ApiMarket_ImageResDTO {
    created: number;
    data?: Kooboo_ApiMarket_ImageDatum[];
  }

  interface Kooboo_ApiMarket_ImageTranslateResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    error_code?: string;
    /**  */
    error_msg?: string;
    data: Kooboo_ApiMarket_Data;
  }

  interface Kooboo_ApiMarket_ItemsItem {
    /**  */
    carType?: string;
    /**  */
    city?: string;
    /**  */
    destinationPlace?: string;
    /**  */
    distance?: string;
    /**  */
    fare?: string;
    /**  */
    itemId?: string;
    /**  */
    pickupDate?: string;
    /**  */
    pickupTime?: string;
    /**  */
    startPlace?: string;
  }

  interface Kooboo_ApiMarket_Location {
    /**  */
    height: number;
    /**  */
    left: number;
    /**  */
    top: number;
    /**  */
    width: number;
  }

  interface Kooboo_ApiMarket_Major {
    /**  */
    probability: number;
    /**  */
    words?: string;
  }

  interface Kooboo_ApiMarket_message {
    location: Kooboo_ApiMarket_Location;
    /**  */
    word?: string;
  }

  interface Kooboo_ApiMarket_NumberResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    log_id: number;
    /**  */
    words_result?: Kooboo_ApiMarket_NumberWords_resultItem[];
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_NumberWords_resultItem {
    location: Kooboo_ApiMarket_Location;
    /**  */
    words?: string;
  }

  interface Kooboo_ApiMarket_OnlineTaxiResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    log_id: number;
    words_result: Kooboo_ApiMarket_OnlineTaxiWords_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_OnlineTaxiWords_result {
    /**  */
    applicationDate?: string;
    /**  */
    endTime?: string;
    /**  */
    itemNum?: string;
    /**  */
    items?: Kooboo_ApiMarket_ItemsItem[];
    /**  */
    phone?: string;
    /**  */
    serviceProvider?: string;
    /**  */
    startTime?: string;
    /**  */
    totalFare?: string;
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_AudioReqBasics {
    /** The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm. */
    file: string;
    /** The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm. */
    fileType: string;
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_AudioReqDTO {
    /** The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm. */
    file: string;
    /** The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm. */
    fileType: string;
    /** you apikey */
    apikey: string;
    /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
    prompt?: string;
    /** The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt. */
    response_format?: string;
    /** What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. */
    temperature: number;
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_CallFunction {
    name?: string;
    arguments?: string;
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_Message {
    role: string;
    content: string;
    tool_call_id?: string;
    tool_calls?: Kooboo_ApiMarket_OpenAI_RequestDTO_ToolCall[];
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_ToolCall {
    id?: string;
    type?: string;
    function: Kooboo_ApiMarket_OpenAI_RequestDTO_CallFunction;
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_Transcription {
    /** The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm. */
    file: string;
    /** The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm. */
    fileType: string;
    /** you apikey */
    apikey: string;
    /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
    prompt?: string;
    /** The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt. */
    response_format?: string;
    /** What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. */
    temperature: number;
    /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency */
    language?: string;
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_Turbo_Basics {
    /** The messages to generate chat completions */
    messages: Kooboo_ApiMarket_OpenAI_RequestDTO_Message[];
  }

  interface Kooboo_ApiMarket_OpenAI_RequestDTO_TurboReqDTO {
    /** The messages to generate chat completions */
    messages: Kooboo_ApiMarket_OpenAI_RequestDTO_Message[];
    /** you apikey */
    apikey: string;
    /** What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. */
    temperature: number;
    /** How many chat completion choices to generate for each input message. */
    n: number;
    /** The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens). */
    max_token: number;
    /** An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. */
    top_p: number;
    /** gpt-4 and dated model releases, gpt-4-turbo-preview and dated model releases, gpt-4-vision-preview, gpt-4-32k and dated model releases, gpt-3.5-turbo and dated model releases, gpt-3.5-turbo-16k and dated model releases, fine-tuned versions of gpt-3.5-turbo */
    model?: string;
    tools?: any[];
    tool_choice?: any;
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_AudioResDTO {
    text?: string;
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_Choice {
    message: Kooboo_ApiMarket_OpenAI_ResponseDTO_Message;
    /** stop, length, content_filter, tool_calls, insufficient_system_resource */
    finish_reason?: string;
    index: number;
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_Function {
    name?: string;
    arguments?: string;
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_Message {
    role?: string;
    content?: string;
    reasoning_content?: string;
    tool_calls?: Kooboo_ApiMarket_OpenAI_ResponseDTO_ToolCall[];
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_ToolCall {
    id?: string;
    type?: string;
    function: Kooboo_ApiMarket_OpenAI_ResponseDTO_Function;
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO {
    id?: string;
    _object?: string;
    created: number;
    model?: string;
    usage: Kooboo_ApiMarket_OpenAI_ResponseDTO_Usage;
    choices?: Kooboo_ApiMarket_OpenAI_ResponseDTO_Choice[];
  }

  interface Kooboo_ApiMarket_OpenAI_ResponseDTO_Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }

  interface Kooboo_ApiMarket_PlantResDTO {
    /**  */
    log_id: number;
    /**  */
    result?: Kooboo_ApiMarket_imageClass_ResultItem[];
  }

  interface Kooboo_ApiMarket_PointsItem {
    /**  */
    x: number;
    /**  */
    y: number;
  }

  interface Kooboo_ApiMarket_Probability {
    /**  */
    average: number;
    /**  */
    min: number;
    /**  */
    variance: number;
  }

  interface Kooboo_ApiMarket_QrcodeResDTO {
    /**  */
    codes_result?: Kooboo_ApiMarket_Codes_resultItem[];
    /**  */
    codes_result_num: number;
    /**  */
    log_id: number;
  }

  interface Kooboo_ApiMarket_QuotaInvoiceResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    log_id: number;
    words_result: Kooboo_ApiMarket_QuotalnvoiceWords_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_QuotalnvoiceWords_result {
    /**  */
    city?: string;
    /**  */
    invoice_code?: string;
    /**  */
    invoice_number?: string;
    /** 壹佰元 */
    invoice_rate?: string;
    /**  */
    invoice_rate_lowercase?: string;
    /** 上海 */
    location?: string;
    /** 上海 */
    province?: string;
  }

  interface Kooboo_ApiMarket_ReportIfSpamResult {
    body?: string;
    headers?: string[];
    code: number;
    status?: string;
    contentLength: number;
    spam?: boolean;
    score?: string;
  }

  interface Kooboo_ApiMarket_Result {
    /**  */
    from?: string;
    /**  */
    to?: string;
    /**  */
    trans_result?: Kooboo_ApiMarket_Trans_resultItem[];
  }

  interface Kooboo_ApiMarket_ResultItem {
    location: Kooboo_ApiMarket_Location;
    major: Kooboo_ApiMarket_Major;
    /**  */
    minor?: string[];
    /**  */
    probability: number;
    /**  */
    type?: string;
  }

  interface Kooboo_ApiMarket_RowWord {
    /**  */
    row?: string;
    /**  */
    word?: string;
  }

  interface Kooboo_ApiMarket_SealResDTO {
    /**  */
    log_id: number;
    /**  */
    result?: Kooboo_ApiMarket_ResultItem[];
    /**  */
    result_num: number;
  }

  interface Kooboo_ApiMarket_SpamScoreResult {
    body?: string;
    headers?: string[];
    code: number;
    status?: string;
    contentLength: number;
    spam?: boolean;
    score?: string;
    criticalScore: number;
    currentScore: number;
  }

  interface Kooboo_ApiMarket_TaxiInvoiceResDTO {
    /**  */
    log_id: number;
    words_result: Kooboo_ApiMarket_Words_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_TellCommandModel {
    body?: string;
    messageClass: number;
    set: number;
    remove: number;
  }

  interface Kooboo_ApiMarket_TestTranslateResDTo {
    errorCode: number;
    errorMsg?: string;
    /**  */
    log_id: number;
    result: Kooboo_ApiMarket_Result;
  }

  interface Kooboo_ApiMarket_TextContentApprovalResDTO {
    code: number;
    riskLevel?: string;
    riskCode?: string;
    details?: Kooboo_ApiMarket_Detail[];
  }

  interface Kooboo_ApiMarket_TrainTicketResDTO {
    /**  */
    direction: number;
    /**  */
    log_id: number;
    words_result: Kooboo_ApiMarket_TrainTicketWords_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_TrainTicketWords_result {
    /** 2019年04月03日 */
    date?: string;
    /** 天津站 */
    destination_station?: string;
    /**  */
    id_num?: string;
    /** 裴一丽 */
    name?: string;
    /** 北京南 */
    sales_station?: string;
    /** 二等座 */
    seat_category?: string;
    /** 02车03C号 */
    seat_num?: string;
    /**  */
    serial_number?: string;
    /** 北京南站 */
    starting_station?: string;
    /**  */
    ticket_num?: string;
    /** ￥54.5元 */
    ticket_rates?: string;
    /**  */
    time?: string;
    /**  */
    train_num?: string;
  }

  interface Kooboo_ApiMarket_Trans_resultItem {
    /**  */
    dst?: string;
    /**  */
    src?: string;
  }

  interface Kooboo_ApiMarket_User_list {
    /**  */
    group_id?: string;
    /**  */
    user_id?: string;
    /** 这是更新之后的备注 */
    user_info?: string;
    /**  */
    score: number;
  }

  interface Kooboo_ApiMarket_User_listItem {
    /**  */
    group_id?: string;
    /**  */
    user_info?: string;
  }

  interface Kooboo_ApiMarket_VarationImageBasics {
    /** The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask. */
    image: string;
  }

  interface Kooboo_ApiMarket_VarationImageReqDTO {
    /** The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask. */
    image: string;
    /** The number of images to generate. Must be between 1 and 10. */
    n: number;
    /** The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. */
    size: string;
    /** The format in which the generated images are returned. Must be one of url or b64_json. */
    response_format: string;
    apikey: string;
  }

  interface Kooboo_ApiMarket_VATInvoiceResDTO {
    /**  */
    log_id?: string;
    words_result: Kooboo_ApiMarket_VATInvoiceWords_result;
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_VATInvoiceWords_result {
    /** 否 */
    agent?: string;
    /**  */
    amountInFiguers?: string;
    /** 壹拾万圆整 */
    amountInWords?: string;
    /** :沈园园 */
    checker?: string;
    /**  */
    city?: string;
    /**  */
    commodityAmount?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityName?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityNum?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityPrice?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityTax?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityTaxRate?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityType?: Kooboo_ApiMarket_RowWord[];
    /**  */
    commodityUnit?: Kooboo_ApiMarket_RowWord[];
    /**  */
    invoiceCode?: string;
    /** 2016年06月02日 */
    invoiceDate?: string;
    /**  */
    invoiceNum?: string;
    /** 专用发票 */
    invoiceType?: string;
    /** 沈园园 */
    noteDrawer?: string;
    /**  */
    password?: string;
    /** :徐蓉 */
    payee?: string;
    /** 上海 */
    province?: string;
    /** 北京市海淀区东北旺西路8号中关村软件园17号楼二属A2010-59108001 */
    purchaserAddress?: string;
    /** 招商银行北京分行大屯路支行8661820285100030 */
    purchaserBank?: string;
    /** 百度时代网络技术(北京)有限公司 */
    purchaserName?: string;
    /**  */
    purchaserRegisterNum?: string;
    /** 告传 */
    remarks?: string;
    /** :嘉定区胜辛南路500号15幢1161室55033753 */
    sellerAddress?: string;
    /** 中国银行南翔支行446863841354 */
    sellerBank?: string;
    /** 上海易火广告传媒有限公司 */
    sellerName?: string;
    /**  */
    sellerRegisterNum?: string;
    /** 第三联 */
    sheetNum?: string;
    /**  */
    totalAmount?: string;
    /**  */
    totalTax?: string;
  }

  interface Kooboo_ApiMarket_WaybillResDTO {
    errorCode: number;
    errorMsg?: string;
    /**  */
    log_id: number;
    /**  */
    words_result?: Kooboo_ApiMarket_WaybillWords_resultItem[];
    /**  */
    words_result_num: number;
  }

  interface Kooboo_ApiMarket_WaybillWords_resultItem {
    /**  */
    bar_code?: Kooboo_ApiMarket_WordMessage[];
    image_info: Kooboo_ApiMarket_Image_info;
    /**  */
    recipient_addr?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    recipient_name?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    recipient_phone?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    sender_addr?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    sender_name?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    sender_phone?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    three_segment_code?: Kooboo_ApiMarket_WordMessage[];
    /**  */
    waybill_number?: Kooboo_ApiMarket_WordMessage[];
  }

  interface Kooboo_ApiMarket_WordMessage {
    /**  */
    word?: string;
  }

  interface Kooboo_ApiMarket_Words_result {
    /**  */
    callServiceSurcharge?: string;
    /**  */
    city?: string;
    /**  */
    date?: string;
    /**  */
    distance?: string;
    /**  */
    fare?: string;
    /**  */
    fuelOilSurcharge?: string;
    /**  */
    invoiceCode?: string;
    /**  */
    invoiceNum?: string;
    /**  */
    pricePerkm?: string;
    /**  */
    province?: string;
    /**  */
    taxiNum?: string;
    /**  */
    time?: string;
  }

  interface Kooboo_ApiMarket_WordsMessage {
    location: Kooboo_ApiMarket_Location;
    /** 袁运筹 */
    words?: string;
  }

  interface Kooboo_Sites_EmailMarketing_InboxPreview_CreateInboxPreviewDTO {
    /** Mail Subject */
    subject: string;
    /** mail body */
    html: string;
    /** ['aolw10_chr26_win'] */
    deviceIds?: string[];
  }

  interface Kooboo_Sites_EmailMarketing_InboxPreview_GetInboxPreviewResultDTO {
    /** Get from k.market.inboxpreview.CreateTask */
    id: string;
  }

  interface Kooboo_Sites_EmailMarketing_InboxPreview_PreviewClient {
    id?: string;
    client?: string;
    os?: string;
    category?: string;
    rotate: boolean;
    default: boolean;
  }

  interface Kooboo_Sites_EmailMarketing_InboxPreview_RenderClientResponse {
    id?: string;
    display_name?: string;
    client?: string;
    os?: string;
    category?: string;
    screenshots: Kooboo_Sites_EmailMarketing_InboxPreview_Screenshots;
    thumbnail?: string;
    image?: string;
    status?: string;
    isCompleted: boolean;
  }

  interface Kooboo_Sites_EmailMarketing_InboxPreview_Screenshots {
    default?: string;
  }

  interface Ocr_OcrRequest {
    /** Base64 image string */
    image: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_ChatRecordMessage_Types_Record {
    msgtime: number;
    type?: string;
    content?: string;
    from_chatroom: boolean;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_CollectMessage_Types_Detail {
    id?: string;
    type?: string;
    ques?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_InfoMessage_Types_NewsItem {
    url?: string;
    title?: string;
    description?: string;
    picurl?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_MeetingVoiceCallMessage_Types_ShareFileData {
    filename?: string;
    demooperator?: string;
    starttime: number;
    endtime: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_MeetingVoiceCallMessage_Types_ShareScreenData {
    share?: string;
    starttime: number;
    endtime: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_MixedMessage_Types_Message {
    type?: string;
    content?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse {
    msgid?: string;
    action?: string;
    from?: string;
    tolist?: string[];
    user?: string;
    roomid?: string;
    msgtime: number;
    msgtype?: string;
    text: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_TextMessage;
    image: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ImageMessage;
    revoke: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_RevokeMessage;
    agree: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_AgreeMessage;
    voice: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VoiceMessage;
    video: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VideoMessage;
    card: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_BusinessCardMessage;
    location: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_LocationMessage;
    emotion: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_EmotionMessage;
    file: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_FileMessage;
    link: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_LinkMessage;
    weapp: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MiniProgramMessage;
    chatrecord: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ChatRecordMessage;
    todo: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_TodoMessage;
    vote: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VoteMessage;
    collect: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_CollectMessage;
    redpacket: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_RedPacketMessage;
    meeting: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MeetingMessage;
    doc: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_DocumentMessage;
    info: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_InfoMessage;
    calendar: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_CalendarMessage;
    mixed: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MixedMessage;
    meeting_voice_call: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MeetingVoiceCallMessage;
    voip_doc_share: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VoIPDocumentShareMessage;
    external_redpacket: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ExternalRedPacketMessage;
    sphfeed: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ChannelsFeedMessage;
    voiceid?: string;
    voipid?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_AgreeMessage {
    userid?: string;
    agree_time: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_BusinessCardMessage {
    corpname?: string;
    userid?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_CalendarMessage {
    title?: string;
    creatorname?: string;
    starttime: number;
    endtime: number;
    attendeename?: string[];
    place?: string;
    remarks?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ChannelsFeedMessage {
    feed_type: number;
    sph_name?: string;
    feed_desc?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ChatRecordMessage {
    title?: string;
    item?: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_ChatRecordMessage_Types_Record[];
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_CollectMessage {
    room_name?: string;
    creator?: string;
    create_time?: string;
    title?: string;
    details?: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_CollectMessage_Types_Detail[];
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_DocumentMessage {
    title?: string;
    link_url?: string;
    doc_creator?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_EmotionMessage {
    type: number;
    width: number;
    height: number;
    sdkfileid?: string;
    md5sum?: string;
    imagesize: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ExternalRedPacketMessage {
    type: number;
    wish?: string;
    totalcnt: number;
    totalamount: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_FileMessage {
    filename?: string;
    fileext?: string;
    sdkfileid?: string;
    md5sum?: string;
    filesize: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_ImageMessage {
    sdkfileid?: string;
    md5sum?: string;
    filesize: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_InfoMessage {
    content?: string;
    url?: string;
    title?: string;
    description?: string;
    item?: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_InfoMessage_Types_NewsItem[];
    callduration?: number;
    invitetype?: number;
    filename?: string;
    meeting_id?: string;
    notification_type?: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_LinkMessage {
    link_url?: string;
    title?: string;
    description?: string;
    image_url?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_LocationMessage {
    latitude: number;
    longitude: number;
    title?: string;
    address?: string;
    zoom: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MeetingMessage {
    meetingtype: number;
    meetingid?: string;
    topic?: string;
    starttime: number;
    endtime: number;
    address?: string;
    remarks?: string;
    status?: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MeetingVoiceCallMessage {
    sdkfileid?: string;
    endtime: number;
    demofiledata?: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_MeetingVoiceCallMessage_Types_ShareFileData[];
    sharescreendata?: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_MeetingVoiceCallMessage_Types_ShareScreenData[];
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MiniProgramMessage {
    title?: string;
    description?: string;
    displayname?: string;
    username?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_MixedMessage {
    item?: SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_Abstractions_MixedMessage_Types_Message[];
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_RedPacketMessage {
    type: number;
    wish?: string;
    totalcnt: number;
    totalamount: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_RevokeMessage {
    pre_msgid?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_TextMessage {
    content?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_TodoMessage {
    title?: string;
    content?: string;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VideoMessage {
    play_length: number;
    sdkfileid?: string;
    md5sum?: string;
    filesize: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VoiceMessage {
    play_length: number;
    sdkfileid?: string;
    md5sum?: string;
    voice_size: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VoIPDocumentShareMessage {
    filename?: string;
    sdkfileid?: string;
    md5sum?: string;
    filesize: number;
  }

  interface SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse_Types_VoteMessage {
    voteid?: string;
    votetype: number;
    votetitle?: string;
    voteitem?: string[];
  }

  interface SpamassassinNet_DatabaseKind {
  }

  interface SpamassassinNet_MessageClass {
  }

  interface System_Text_Json_Nodes_JsonNode {
    options: System_Text_Json_Nodes_JsonNodeOptions;
    parent: System_Text_Json_Nodes_JsonNode;
    root: System_Text_Json_Nodes_JsonNode;
  }

  interface System_Text_Json_Nodes_JsonNodeOptions {
    propertyNameCaseInsensitive: boolean;
  }

  interface Translation_ImageRequest {
    /** base64  byte [] */
    image: string;
    /** Translation source language */
    from?: string;
    /** Translation target language */
    to: string;
  }

  interface Translation_TextRequest {
    /** Translation source language */
    from: string;
    /** Translation target language */
    to: string;
    text: string;
  }

  interface WeWork_ChatRecordsRequest {
    corpId?: string;
    secretKey?: string;
    privateKey?: string;
    lastSequence: number;
    limit: number;
  }

  interface WeWork_MediaFileRequest {
    corpId?: string;
    secretKey?: string;
    privateKey?: string;
    fileId?: string;
  }

  interface imageclassify {
    /** var bytes= k.file.readBinary("Animal.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ImageClassify.Animal(image);
------ params description ------
image: Base64 image string
 */
    Animal(image?: string): Kooboo_ApiMarket_AnimalResDTO;
    /** var bytes= k.file.readBinary("Plant.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ImageClassify.Plant(image);
------ params description ------
image: Base64 image string
 */
    Plant(image?: string): Kooboo_ApiMarket_PlantResDTO;
  }

  interface audio {
    /** k.market.audio.Tts_Post("hello")
------ params description ------
text: 
 */
    Tts(text: string): string;
    /** var file = k.file.readBinary("Asr.pcm");
var params={dev_pid:1537,base64:file,format:"pcm",rate:8000}
var result = k.market.audio.Asr (params)
 */
    Asr(body: Kooboo_ApiMarket_AsrReqDTO): Kooboo_ApiMarket_AsrResDTO;
  }

  interface face {
    /** var bytes= k.file.readBinary("face.jpg")
var image= k.security.toBase64(bytes)
var params={image:image,user_id:"test01",user_info:"user_info"}
var result = k.market.face.AddUser(params);
 */
    AddUser(body: Kooboo_ApiMarket_FaceAddOrUpdateReqDTO): Kooboo_ApiMarket_FaceAddResDTO;
    /** var bytes= k.file.readBinary("face.jpg")
var image= k.security.toBase64(bytes)
var params={image:image,user_id:"test01",user_info:"user_info"}
var result = k.market.face.UpdateUser(params);
 */
    UpdateUser(body: Kooboo_ApiMarket_FaceAddOrUpdateReqDTO): Kooboo_ApiMarket_FaceUpdateResDTO;
    /** k.market.face.DeleteFace("userid","facetoken")
------ params description ------
userId: 
faceToken: 
 */
    DeleteFace(userId?: string, faceToken?: string): Kooboo_ApiMarket_FaceBaseResDTO;
    /** :
            k.market.face.GetUser("test01")
------ params description ------
userId: 
 */
    GetUser(userId?: string): Kooboo_ApiMarket_FaceGetUserResDTO;
    /** k.market.face.GetFaces("test01")
------ params description ------
userId: 
 */
    GetFaces(userId?: string): Kooboo_ApiMarket_FaceGetListResDTO;
    /** k.market.face.GetUsers(1,10)
------ params description ------
start: 
length: 
 */
    GetUsers(start?: number, length?: number): Kooboo_ApiMarket_GroupGetUsersResDTO;
    /** k.market.face.DeleteUser("test01")
------ params description ------
userId: 
 */
    DeleteUser(userId?: string): Kooboo_ApiMarket_FaceBaseResDTO;
    /** var file=k.security.toBase64(k.file.readBinary("face.jpg"))
var params={image:file,user_id:"test01",max_user_num:10}
k.market.face.FaceSearch_Post(params)
 */
    FaceSearch(body: Kooboo_ApiMarket_FaceSrearchReqDTO): Kooboo_ApiMarket_FaceSearchResDTO;
  }

  interface anthropic {
    /** var messages=[...],
var params={max_token:2048,temperature:0,apiKey:"apikey",messages:messages}
k.market.anthropic.messages(params)
 */
    Messages(body: Anthropic_MessageRequest): Anthropic_MessageResponse;
    /** var messages=[...],
var params={max_token:2048,temperature:0,apiKey:"apikey",messages:messages}
k.market.anthropic.messages(params)
 */
    AWSMessages(body: Anthropic_MessageRequest): Anthropic_MessageResponse;
    /** not support in kscript,do not use it!
 */
    StreamMessages(body: Anthropic_MessageRequest): any;
  }

  interface baidu {
    /** k.market.baidu.SiteSubmit("url","token",["http://example.com"])
------ params description ------
siteUrl: 主网站URL
baiduToken: 百度站长的Token
urladdress: 需要提交的网址
 */
    SiteSubmit(siteUrl?: string, baiduToken?: string, urladdress?: string[]): Kooboo_ApiMarket_BaiduSubmitResDTO;
    /** var messages=[{"role": "system", "content": "You are a helpful assistant."},
{"role": "user", "content": "Who won the world series in 2020?"},
{"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
{ "role": "user", "content": "Where was it played?"}]
var params={n:1,max_token:200,temperature:0,apiKey:"apikey",messages:messages}
k.market.deepseek.chat_Turbo(params)
 */
    chat_turbo(body: Kooboo_ApiMarket_BaiduServer_QianfanReqDTO): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
  }

  interface spamassassin {
    /** 
------ params description ------
body: 
 */
    check(body?: string): Kooboo_ApiMarket_SpamScoreResult;
    /** 
 */
    dump(): string;
    /** 
 */
    ping(): Kooboo_ApiMarket_BasicResult;
    /** 
------ params description ------
body: 
 */
    process(body?: string): Kooboo_ApiMarket_SpamScoreResult;
    /** 
------ params description ------
body: 
 */
    report(body?: string): Kooboo_ApiMarket_SpamScoreResult;
    /** 
------ params description ------
body: 
 */
    report_if_spam(body?: string): Kooboo_ApiMarket_ReportIfSpamResult;
    /** 
------ params description ------
body: 
 */
    symbols(body?: string): Kooboo_ApiMarket_SpamScoreResult;
    /** 
 */
    tell(body: Kooboo_ApiMarket_TellCommandModel): Kooboo_ApiMarket_BasicResult;
  }

  interface translation {
    /** var text = "这是一个中文"
var result=k.market.translation.TextTranslate("zh","en",text)
------ params description ------
from: Translation source language
to: Translation target language
text: 
 */
    TextTranslate(from: string, to: string, text: string): Kooboo_ApiMarket_TestTranslateResDTo;
    /** var text = "这是一个中文"
var result=k.market.translation.TextTranslate("zh","en",text)
------ params description ------
from: Translation source language
to: Translation target language
text: 
 */
    GoogleTextTranslate(from: string, to: string, text: string): string;
    /** var byte=k.file.readBinary("Image.jpeg")
var file=k.security.toBase64(byte)
var result = k.market.translation.ImageTranslation_Post(file,"zh","en")
------ params description ------
image: base64  byte []
from: Translation source language
to: Translation target language
 */
    ImageTranslate(image: string, from?: string, to: string): Kooboo_ApiMarket_ImageTranslateResDTO;
  }

  interface contentapproval {
    /** var bytes= k.file.readBinary("sex.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ContentApproval.ImageFilter(image);
------ params description ------
image: need check image
 */
    ImageFilter(image: string): Kooboo_ApiMarket_ImageContentApprovalResDTO;
    /** var text = "check text"
k.market.contentapproval.TextFilter(text,"false")
------ params description ------
txt: Need to check text
skipBidi: Whether to skip the bidi keyword character, default to the default, optional true, false
 */
    TextFilter(txt: string, skipBidi?: string): Kooboo_ApiMarket_TextContentApprovalResDTO;
  }

  interface chatgpt {
    /** var res=k.market.chatgpt.chat_Turbo([{content:"What is artificial intelligence",role:"user"}])
k.response.json(res)
------ params description ------
messages: The messages to generate chat completions
 */
    chat_turbo(messages: Kooboo_ApiMarket_OpenAI_RequestDTO_Message[]): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
    /** var messages=[{"role": "system", "content": "You are a helpful assistant."},
{"role": "user", "content": "Who won the world series in 2020?"},
{"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
{ "role": "user", "content": "Where was it played?"}]
var params={n:1,max_token:200,temperature:0,apiKey:"apikey",messages:messages}
k.market.chatgpt.chat_Turbo(params)
 */
    chat_turbo(body: Kooboo_ApiMarket_OpenAI_RequestDTO_TurboReqDTO): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
    /** var messages=[{"role": "system", "content": "You are a helpful assistant."},
{"role": "user", "content": "Who won the world series in 2020?"},
{"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
{ "role": "user", "content": "Where was it played?"}]
var params={n:1,max_token:200,temperature:0,apiKey:"apikey",messages:messages}
k.market.chatgpt.chat_Turbo(params)
 */
    chat_gpt5(body: Kooboo_ApiMarket_OpenAI_RequestDTO_TurboReqDTO): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
    /** var res=k.market.chatgpt.chat("What is artificial intelligence")
k.response.json(res)
------ params description ------
prompt: You question
 */
    chat(prompt: string): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
    /** var res = k.market.chatgpt.image_generate ("a cute cat")
k.response.json(res.data[0].url)
------ params description ------
prompt: A text description of the desired image(s). The maximum length is 1000 characters.
 */
    image_generate(prompt: string): Kooboo_ApiMarket_ImageResDTO;
    /** var params={prompt:"a cute cat",size:"1024x1024",response_format:"url",n:2,apiKey:apikey}
var res = k.market.chatgpt.image_generate (params)
k.response.json(res.data[0].url)
 */
    image_generate(body: Kooboo_ApiMarket_GenerationImageReqDTO): Kooboo_ApiMarket_ImageResDTO;
    /** var imagebyte = k.file.readBinary("strawberries.png");
var imagefile = k.security.toBase64(imagebyte);
var res = k.market.chatgpt.image_Edit(imagefile, "The strawberries are in the woods")
k.response.json(res.data[0].url)
------ params description ------
image: The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
prompt: A text description of the desired image(s). The maximum length is 1000 characters.
 */
    image_Edit(image: string, prompt: string): Kooboo_ApiMarket_ImageResDTO;
    /** var imagebyte= k.file.readBinary("strawberries.png");   
var maskbyte = k.file.readBinary("strawberriesMask.png");
var imagefile = k.security.toBase64(imagebyte);
var maskfile = k.security.toBase64(maskbyte);
var params={prompt:"The strawberries are in the woods",image:imagefile,mask:maskfile,n:1,response_format:"url",size:"1024x1024",apiKey:apiKey}
var res = k.market.chatgpt.image_Edit(params)
k.response.json(res.data[0].url)
 */
    image_Edit(body: Kooboo_ApiMarket_EditImageReqDTO): Kooboo_ApiMarket_ImageResDTO;
    /** var byte=k.file.readBinary("strawberries.png")
var file = k.security.toBase64(byte)
var result = k.market.chatgpt.image_variation(file)
------ params description ------
image: The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
 */
    image_variation(image: string): Kooboo_ApiMarket_ImageResDTO;
    /** var imagebyte= k.file.readBinary("strawberries.png");
var imagefile = k.security.toBase64(imagebyte);
var params={image:imagefile,n:1,response_format:"url",size:"1024x1024",apiKey:apiKey}
var res = k.market.chatgpt.image_variation (params)
k.response.json(res.data[0].url)
 */
    image_variation(body: Kooboo_ApiMarket_VarationImageReqDTO): Kooboo_ApiMarket_ImageResDTO;
    /** var file=k.file.readBinary("test.mp3")
var audiofile = k.security.toBase64(file);
var res = k.market.chatgpt.transcriptions(audiofile, "mp3")
------ params description ------
file: The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
fileType: The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
 */
    transcriptions(file: string, fileType: string): Kooboo_ApiMarket_OpenAI_ResponseDTO_AudioResDTO;
    /** var file=k.file.readBinary("test.mp3")
var audiofile = k.security.toBase64(file);
var params={file:audiofile,apikey:"apikey",fileType:"mp3",temperature:0,language:"language",response_format:"json",prompt:"prompt"}
var res = k.market.chatgpt.transcriptions (params)
k.response.json(res)
 */
    transcriptions(body: Kooboo_ApiMarket_OpenAI_RequestDTO_Transcription): Kooboo_ApiMarket_OpenAI_ResponseDTO_AudioResDTO;
    /** var file=k.file.readBinary("test.mp3")
var audiofile = k.security.toBase64(file);
var res= k.market.chatgpt.Translates(audiofile,"mp3")
k.response.json(res)
------ params description ------
file: The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
fileType: The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
 */
    translates(file: string, fileType: string): Kooboo_ApiMarket_OpenAI_ResponseDTO_AudioResDTO;
    /** var file=k.file.readBinary("test.mp3")
var audiofile = k.security.toBase64(file);
var params={file:audiofile,apikey:"apikey",fileType:"mp3",temperature:0,response_format:"json",prompt:"prompt"}
var res = k.market.chatgpt.translates (params)
k.response.json(res)
 */
    translates(body: Kooboo_ApiMarket_OpenAI_RequestDTO_AudioReqDTO): Kooboo_ApiMarket_OpenAI_ResponseDTO_AudioResDTO;
  }

  interface ocr {
    /** var bytes= k.file.readBinary("BankCard.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.BankCard(image)
------ params description ------
image: Base64 image string
 */
    BankCard(image: string): Kooboo_ApiMarket_BankCardResDTO;
    /** var bytes= k.file.readBinary("Airticket.png")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.AirTicket(image);
------ params description ------
image: Base64 image string
 */
    AirTicket(image: string): Kooboo_ApiMarket_AirTicketResDTO;
    /** var bytes= k.file.readBinary("CovidTest.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.CovidTest(image);
------ params description ------
image: Base64 image string
 */
    CovidTest(image: string): Kooboo_ApiMarket_CovidTestAnalysisResDTO;
    /** var bytes= k.file.readBinary("BusinessLicense.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.BusinessLicense(image);
------ params description ------
image: Base64 image string
 */
    BusinessLicense(image: string): Kooboo_ApiMarket_BusinessLicenseResDTO;
    /** var bytes= k.file.readBinary("GeneralBill.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.GeneralBill(image);
------ params description ------
image: Base64 image string
 */
    GeneralBill(image: string): Kooboo_ApiMarket_GeneralBillResDTO;
    /** var bytes= k.file.readBinary("GeneralInvoice.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.GeneralInvoice(image);
------ params description ------
image: Base64 image string
 */
    GeneralInvoice(image: string): Kooboo_ApiMarket_GeneralInvoiceResDTO;
    /** var bytes= k.file.readBinary("Handwriting.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.Handwriting(image);
------ params description ------
image: Base64 image string
 */
    Handwriting(image: string): Kooboo_ApiMarket_HandwritingResDTO;
    /** var bytes= k.file.readBinary("HealthCode.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.HealthCode(image);
------ params description ------
image: Base64 image string
 */
    HealthCode(image: string): Kooboo_ApiMarket_HealthCodeResDTO;
    /** var bytes= k.file.readBinary("IdCardFront.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.IdCardFront(image);
------ params description ------
image: Base64 image string
 */
    IdCardFront(image: string): Kooboo_ApiMarket_IdCardFrontResDTO;
    /** var bytes= k.file.readBinary("IdCardBack.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.IdCardBack(image);
------ params description ------
image: Base64 image string
 */
    IdCardBack(image: string): Kooboo_ApiMarket_IdCardBackResDTO;
    /** var bytes= k.file.readBinary("ImageAccurate.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.ImageAccurate(image);
------ params description ------
image: Base64 image string
 */
    ImageAccurate(image: string): Kooboo_ApiMarket_ImageAccurateResDTO;
    /** var bytes= k.file.readBinary("ImageAnalysis.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.ImageAnalysis(image);
------ params description ------
image: Base64 image string
 */
    ImageAnalysis(image: string): Kooboo_ApiMarket_ImageAnalysisResDTO;
    /** var bytes= k.file.readBinary("Number.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.Number(image);
------ params description ------
image: Base64 image string
 */
    Number(image: string): Kooboo_ApiMarket_NumberResDTO;
    /** var bytes= k.file.readBinary("OnlineTaxi.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.OnlineTaxi(image);
------ params description ------
image: Base64 image string
 */
    OnlineTaxi(image: string): Kooboo_ApiMarket_OnlineTaxiResDTO;
    /** var bytes= k.file.readBinary("Qrcode.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.Qrcode(image);
------ params description ------
image: Base64 image string
 */
    QrCode(image: string): Kooboo_ApiMarket_QrcodeResDTO;
    /** var bytes= k.file.readBinary("QuotaInvoice.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.QuotaInvoice(image);
------ params description ------
image: Base64 image string
 */
    QuotaInvoice(image: string): Kooboo_ApiMarket_QuotaInvoiceResDTO;
    /** var bytes= k.file.readBinary("Seal.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.Seal(image);
------ params description ------
image: Base64 image string
 */
    Seal(image: string): Kooboo_ApiMarket_SealResDTO;
    /** var bytes= k.file.readBinary("TaxiInvoice.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.TaxiInvoice(image);
------ params description ------
image: Base64 image string
 */
    TaxiInvoice(image: string): Kooboo_ApiMarket_TaxiInvoiceResDTO;
    /** var bytes= k.file.readBinary("TrainTicket.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.TrainTicket(image);
------ params description ------
image: Base64 image string
 */
    TrainTicket(image: string): Kooboo_ApiMarket_TrainTicketResDTO;
    /** var bytes= k.file.readBinary("VATInvoice.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.VATInvoice(image);
------ params description ------
image: Base64 image string
 */
    VATInvoice(image: string): Kooboo_ApiMarket_VATInvoiceResDTO;
    /** var bytes= k.file.readBinary("Waybill.jpg")
var image= k.security.toBase64(bytes)
var result = k.market.ocr.Waybill(image);
------ params description ------
image: Base64 image string
 */
    Waybill(image: string): Kooboo_ApiMarket_WaybillResDTO;
  }

  interface inboxpreview {
    /** var devicesList=k.market.inboxpreview.GetDevices();
 */
    GetDevices(): Kooboo_Sites_EmailMarketing_InboxPreview_PreviewClient[];
    /** var id=k.market.inboxpreview.CreateTask("test","<div>test body</div>")
var result=k.market.inboxpreview.GetTask(id)
------ params description ------
subject: Mail Subject
html: mail body
deviceIds: ['aolw10_chr26_win']
 */
    CreateTask(subject: string, html: string, deviceIds?: string[]): string;
    /** var id=k.market.inboxpreview.CreateTask("test","<div>test body</div>")
var result=k.market.inboxpreview.GetTask(id)
------ params description ------
id: Get from k.market.inboxpreview.CreateTask
 */
    GetTask(id: string): Kooboo_Sites_EmailMarketing_InboxPreview_RenderClientResponse[];
  }

  interface deepseek {
    /** var res=k.market.deepseek.chat_Turbo([{content:"What is artificial intelligence",role:"user"}])
k.response.json(res)
------ params description ------
messages: The messages to generate chat completions
 */
    chat_turbo(messages: Kooboo_ApiMarket_DeepSeek_Message[]): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
    /** var messages=[{"role": "system", "content": "You are a helpful assistant."},
{"role": "user", "content": "Who won the world series in 2020?"},
{"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
{ "role": "user", "content": "Where was it played?"}]
var params={n:1,max_token:200,temperature:0,apiKey:"apikey",messages:messages}
k.market.deepseek.chat_Turbo(params)
 */
    chat_turbo(body: Kooboo_ApiMarket_DeepSeek_ReqDTO): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
    /** var res=k.market.deepseek.chat("What is artificial intelligence")
k.response.json(res)
------ params description ------
prompt: You question
 */
    chat(prompt: string): Kooboo_ApiMarket_OpenAI_ResponseDTO_TurboResDTO;
  }

  interface weworkfinance {
    /** var request={
    corpId:"xx",
    secretKey:"xx",
    privateKey:"xx",
    lastSequence:0,
    limit:100
}
k.market.weworkfinance.getChatRecords(request)
 */
    getChatRecords(body: WeWork_ChatRecordsRequest): SKIT_FlurlHttpClient_Wechat_Work_ExtendedSDK_Finance_Models_DecryptChatRecordResponse[];
    /** var request={
    corpId:"xx",
    secretKey:"xx",
    privateKey:"xx",
    fileId:"xx"
}
var base64 = k.market.weworkfinance.getMediaFile(request)
 */
    getMediaFile(body: WeWork_MediaFileRequest): string;
  }

  interface Market {
    imageclassify: KMarket.imageclassify;
    audio: KMarket.audio;
    face: KMarket.face;
    anthropic: KMarket.anthropic;
    baidu: KMarket.baidu;
    spamassassin: KMarket.spamassassin;
    translation: KMarket.translation;
    contentapproval: KMarket.contentapproval;
    chatgpt: KMarket.chatgpt;
    ocr: KMarket.ocr;
    inboxpreview: KMarket.inboxpreview;
    deepseek: KMarket.deepseek;
    weworkfinance: KMarket.weworkfinance;
  }

}
declare namespace KScript {
  interface k {
    market: KMarket.Market;
  }

}


declare namespace Kooboo.Sites.Models.Security {
  interface Full {
    /** Http basic authentication username */
    username: string;
    /** Http basic authentication password */
    password: string;
    /** OAuth2 authentication client_id */
    clientId: string;
    /** OAuth2 authentication client_secret */
    clientSecret: string;
    /** [(Optional) OAuth2 authentication accessToken] [Http bearer authentication token] [Apikey authentication token] */
    accessToken: string;
    /** (Optional) OAuth2 authentication refreshToken */
    refreshToken: string;
    /** (Optional) OAuth2 accessToken UTC expire time */
    expiresIn: string;
    /** (Optional) Apikey authorization or OAuth2 token type like 'Bearer' */
    name: string;
  }

  interface HttpBasic {
    /** Http basic authentication username */
    username: string;
    /** Http basic authentication password */
    password: string;
  }

  interface Token {
    /** [(Optional) OAuth2 authentication accessToken] [Http bearer authentication token] [Apikey authentication token] */
    accessToken: string;
    /** (Optional) Apikey authorization or OAuth2 token type like 'Bearer' */
    name: string;
  }

  interface OAuth2 {
    /** OAuth2 authentication client_id */
    clientId: string;
    /** OAuth2 authentication client_secret */
    clientSecret: string;
    /** [(Optional) OAuth2 authentication accessToken] [Http bearer authentication token] [Apikey authentication token] */
    accessToken: string;
    /** (Optional) OAuth2 authentication refreshToken */
    refreshToken: string;
    /** (Optional) OAuth2 accessToken UTC expire time */
    expiresIn: string;
  }

}
declare namespace OpenApi {
  interface openApi {
  }

}
declare namespace KScript {
  interface k {
    openApi: OpenApi.openApi;
  }

}

declare namespace Kooboo.KContent {
  interface KContentInstance {
    Applications: Kooboo.KContent.Folders.Applications;
    EcommerceKooboo: Kooboo.KContent.Folders.EcommerceKooboo;
    JobBaseQuestion: Kooboo.KContent.Folders.JobBaseQuestion;
    Price: Kooboo.KContent.Folders.Price;
    ClientInfoBanner: Kooboo.KContent.Folders.ClientInfoBanner;
    JobQuestion: Kooboo.KContent.Folders.JobQuestion;
    EcommerceFeature: Kooboo.KContent.Folders.EcommerceFeature;
    article: Kooboo.KContent.Folders.article;
    Service: Kooboo.KContent.Folders.Service;
    homeTabs: Kooboo.KContent.Folders.homeTabs;
    PageAdvantage: Kooboo.KContent.Folders.PageAdvantage;
    EcommerceShoplazza: Kooboo.KContent.Folders.EcommerceShoplazza;
    category: Kooboo.KContent.Folders.category;
    EcommerceContent: Kooboo.KContent.Folders.EcommerceContent;
    aiPageCards: Kooboo.KContent.Folders.aiPageCards;
    advantage: Kooboo.KContent.Folders.advantage;
    ClientInfoDocEntry: Kooboo.KContent.Folders.ClientInfoDocEntry;
    JobQuestionItem: Kooboo.KContent.Folders.JobQuestionItem;
    News: Kooboo.KContent.Folders.News;
    HomeBanner: Kooboo.KContent.Folders.HomeBanner;
    Favorite: Kooboo.KContent.Folders.Favorite;
    EcommerceTitle: Kooboo.KContent.Folders.EcommerceTitle;
    JobItem: Kooboo.KContent.Folders.JobItem;
    EcommerceShopify: Kooboo.KContent.Folders.EcommerceShopify;
    ListItem: Kooboo.KContent.Folders.ListItem;
    PriceItem: Kooboo.KContent.Folders.PriceItem;
    index_action: Kooboo.KContent.Folders.index_action;
    ClientInfoUpdate: Kooboo.KContent.Folders.ClientInfoUpdate;
    products: Kooboo.KContent.Folders.products;
    Downloads: Kooboo.KContent.Folders.Downloads;
    email: Kooboo.KContent.Folders.email;
    Package: Kooboo.KContent.Folders.Package;
    homeContent: Kooboo.KContent.FolderTypes.homeContent;
    operators(): KScript.Operators;
  }

  interface queryOptions {
    includeOfflineData?: boolean;
    excludeEmpty?: boolean;
  }

  interface contentTypeBase {
    /** Build in property id */
    id?: string;
    /** Build in property userKey */
    userKey?: string;
    /** Build in property sequence */
    sequence?: number;
    /** Build in property online */
    online?: boolean;
    /** Build in property version */
    version?: number;
    /** Build in property lastModified */
    lastModified?: string;
    /** Build in property creationDate */
    creationDate?: string;
  }

  interface folderBase<T,M> {
    /** 
    var blogs= k.content.blog.all();
     */
    all(): T[];
    /** 
    var blogs= k.content.blog.all({
        includeOfflineData:true
    });
     */
    all(options: Kooboo.KContent.queryOptions): T[];
    /** 
    var blog= k.content.blog.get('ef4e634b-87a6-b2d2-ec14-5139287beb6e');
     */
    get(nameOrId: string): T;
    /** 
    var blog= k.content.blog.add({
        title:'blog1',
        body:'My frist blog'
    });
     */
    add(content: M): T;
    /** 
    var blog= k.content.blog.find(`title='title1'`);
    blog.title='title2';
    k.content.blog.update(blog);
     */
    update(content: M): void;
    /** 
    var blog= k.content.blog.find(`title='title1'`);

    k.content.blog.delete(blog);

    //or
    k.content.blog.delete(blog.id);
     */
    delete(nameOrId: any): void;
    /** 
    find the first matched items based on search condition
    //available operators: ==,  >=,  >,  <,  <=, contains, startwith 
    var item= k.content.blog.find("name == 'matchedvalue'"); 
    var item= k.content.blog.find("number>=123"); 
    var item= k.content.blog.find("number >=123&&name=='matchedvalue'"); 
    var item= k.content.blog.find("name contains 'matchedvalue'"); 
    var item= k.content.blog.find("name startwith 'matchedvalue'");
     */
    find(query: string): T;
    /** 
    find the first matched items based on filter object
    const { GT } = k.content.operators();      
    var item= k.content.blog.find({age:{[GT]:23}}); 
     */
    find(query: any): T;
    /** 
    find the first matched items based on search condition
    //available operators: ==,  >=,  >,  <,  <=, contains, startwith 
    var item= k.content.blog.find("name == 'matchedvalue'",{
        includeOfflineData:true
    }); 
     */
    find(query: string, options: Kooboo.KContent.queryOptions): T;
    /** 
    find the first matched items based on filter object
    const { GT } = k.content.operators();      
    var item= k.content.blog.find({age:{[GT]:23}},{
        includeOfflineData:true
    }); 
     */
    find(query: any, options: Kooboo.KContent.queryOptions): T;
    /** 
    Search text contents based on query condition
    // available operators: ==,  >=,  >,  <,  <=, contains, startwith 
    var items = k.content.blog.findAll("name == 'matchedvalue'"); 
    var items = k.content.blog.findAll("number>=123"); 
    var items = k.content.blog.findAll("number >=123&&name=='matchedvalue'"); 
    var items = k.content.blog.findAll("name contains 'matchedvalue'"); 
    var items = k.content.blog.findAll("name startwith 'matchedvalue'");
     */
    findAll(query: string): T[];
    /** 
    find the first matched items based on filter object
    const { GT } = k.content.operators();      
    var items= k.content.blog.findAll({age:{[GT]:23}}); 
     */
    findAll(query: any): T[];
    /** 
    Search text contents based on query condition
    // available operators: ==,  >=,  >,  <,  <=, contains, startwith 
    var items = k.content.blog.findAll("name == 'matchedvalue'",{
        includeOfflineData:true
    });
     */
    findAll(query: string, options: Kooboo.KContent.queryOptions): T[];
    /** 
    find the first matched items based on filter object
    const { GT } = k.content.operators();      
    var items= k.content.blog.findAll({age:{[GT]:23}},{
        includeOfflineData:true
    }); 
     */
    findAll(query: any, options: Kooboo.KContent.queryOptions): T[];
    /** 
    Sort content on folder
    var items= k.content.blog.move('sourceId','prevId','nextId'); 
     */
    move(source: string, prev: string, next: string): T[];
  }

}
declare namespace KScript {
  interface k {
    content: Kooboo.KContent.KContentInstance;
  }

}
declare namespace Kooboo.KContent.Types {
  interface EcommerceShopify {
    /** content TextArea */
    content: string;
    /** 样式类型 Selection */
    type: string;
  }

  interface PageAdvantage {
    /** HeadLine TextBox */
    HeadLine: string;
    /** Title TextBox */
    Title: string;
    /** PageName RadioBox */
    PageName: string;
  }

  interface PriceItem {
    /** Title TextBox */
    Title: string;
    /** SubTitle TextBox */
    SubTitle: string;
    /** Price TextBox */
    Price: string;
    /** PriceUnit TextBox */
    PriceUnit: string;
  }

  interface ClientInfoDocEntry {
    /** Name TextBox */
    Name: string;
    /** ICO TextBox */
    ICO: string;
    /** URL TextBox */
    URL: string;
  }

  interface PackageType {
    /** Name TextBox */
    Name: string;
    /** title TextBox */
    title: string;
    /** summary TextArea */
    summary: string;
  }

  interface Package {
    /** Version TextBox */
    Version: string;
    /** Platform RadioBox */
    Platform: string;
    /** Url TextBox */
    Url: string;
    /** Sha256 TextBox */
    Sha256: string;
    /** ForceUpgrade Switch */
    ForceUpgrade: string;
    /** Title TextBox */
    Title: string;
    /** Summary TextArea */
    Summary: string;
  }

  interface Favorite {
    /** type RadioBox */
    type: string;
    /** referenceId TextBox */
    referenceId: string;
    /** remark TextArea */
    remark: string;
    /** culture RadioBox */
    culture: string;
    /** cover MediaFile */
    cover: string;
  }

  interface homeContent {
    /** Heading TextBox */
    Heading: string;
    /** Title TextBox */
    Title: string;
  }

  interface JobItem {
    /** name TextBox */
    name: string;
    /** key TextBox */
    key: string;
    /** title TextBox */
    title: string;
    /** description RichEditor */
    description: string;
  }

  interface Service {
    /** name TextBox */
    name: string;
    /** url TextBox */
    url: string;
    /** cover MediaFile */
    cover: string;
    /** price (USD) Number */
    price: string;
    /** culture RadioBox */
    culture: string;
  }

  interface homeTabs {
    /** tabTitle TextBox */
    tabTitle: string;
    /** title TextBox */
    title: string;
    /** icon MediaFile */
    icon: string;
    /** sellingPoints ValueList */
    sellingPoints: string;
    /** image MediaFile */
    image: string;
    /** buttons KeyValues */
    buttons: string;
  }

  interface EcommerceDetail {
    /** content RichEditor */
    content: string;
  }

  interface EcommerceTitle {
    /** icon AdvancedMediaFile */
    icon: string;
    /** title RichEditor */
    title: string;
  }

  interface ClientInfoBanner {
    /** Title TextBox */
    Title: string;
    /** Summary TextBox */
    Summary: string;
    /** LinkText TextBox */
    LinkText: string;
    /** Url TextBox */
    Url: string;
    /** IsOnlineServer Switch */
    IsOnlineServer: string;
  }

  interface index_action {
    /** title TextBox */
    title: string;
    /** description TextArea */
    description: string;
    /** code_img MediaFile */
    code_img: string;
    /** mobile_img MediaFile */
    mobile_img: string;
    /** sort Number */
    sort: string;
  }

  interface category {
    /** name TextBox */
    name: string;
    /** icon MediaFile */
    icon: string;
  }

  interface EcommerceContent {
    /** title TextBox */
    title: string;
    /** icon AdvancedMediaFile */
    icon: string;
  }

  interface ClientInfoDoc {
    /** Title TextBox */
    Title: string;
    /** Summary TextBox */
    Summary: string;
    /** Url TextBox */
    Url: string;
    /** Date TextBox */
    Date: string;
  }

  interface ListItem {
    /** Title TextBox */
    Title: string;
    /** Summary TextArea */
    Summary: string;
    /** Image MediaFile */
    Image: string;
  }

  interface HomeBanner {
    /** DocLink TextBox */
    DocLink: string;
    /** PageName RadioBox */
    PageName: string;
    /** HeadImage MediaFile */
    HeadImage: string;
    /** SubTitle TextBox */
    SubTitle: string;
    /** Heading TextBox */
    Heading: string;
    /** Title TextBox */
    Title: string;
  }

  interface products {
    /** name TextBox */
    name: string;
    /** description TextBox */
    description: string;
    /** thumb MediaFile */
    thumb: string;
    /** sort Number */
    sort: string;
  }

  interface EcommerceKooboo {
    /** content TextArea */
    content: string;
    /** 样式类型 Selection */
    type: string;
  }

  interface Price {
    /** Name TextBox */
    Name: string;
    /** Icon MediaFile */
    Icon: string;
    /** HeadLine TextBox */
    HeadLine: string;
  }

  interface Applications {
    /** title TextBox */
    title: string;
    /** description TextBox */
    description: string;
    /** icon MediaFile */
    icon: string;
    /** linkto TextBox */
    linkto: string;
  }

  interface EcommerceShoplazza {
    /** content TextArea */
    content: string;
    /** 样式类型 Selection */
    type: string;
  }

  interface Downloads {
    /** Title TextBox */
    Title: string;
    /** Summary RichEditor */
    Summary: string;
    /** LinkText TextBox */
    LinkText: string;
    /** FileUrl TextBox */
    FileUrl: string;
  }

  interface EcommerceFeature {
    /** sub title TextBox */
    title: string;
  }

  interface JobQuestionItem {
    /** text TextBox */
    text: string;
    /** type Selection */
    type: string;
    /** name TextBox */
    name: string;
    /** is_required Switch */
    is_required: string;
    /** options KeyValues */
    options: string;
    /** errMessage TextBox */
    errorMessage: string;
    /** description TextBox */
    description: string;
    /** input_type TextBox */
    input_type: string;
    /** input_accept TextBox */
    input_accept: string;
    /** file_size Number */
    file_size: string;
    /** file_length Number */
    file_length: string;
  }

  interface ClientInfoUpdate {
    /** Title TextBox */
    Title: string;
    /** Summary TextArea */
    Summary: string;
    /** Image MediaFile */
    Image: string;
    /** Url TextBox */
    Url: string;
    /** Date TextBox */
    Date: string;
  }

  interface News {
    /** Title TextBox */
    Title: string;
    /** Summary TextArea */
    Summary: string;
    /** Image MediaFile */
    Image: string;
    /** Url TextBox */
    Url: string;
  }

  interface article {
    /** title TextBox */
    title: string;
    /** content RichEditor */
    content: string;
  }

}
declare namespace Kooboo.KContent.RelationFolders {
  interface PriceItem {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface homeTabs {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface JobQuestionItem {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface EcommerceShopify {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface EcommerceKooboo {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface EcommerceShoplazza {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface ListItem {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface EcommerceFeature {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface category {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

  interface article {
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=k.content.comment.all();
var comment1=comment[0];

blog1.comment().add(comment1);

//or
blog1.comment().add(comment1.id);
 */
    add(nameOrId: any): void;
    /** 
var blogs= k.content.blog.all();
var blog1=blogs[0];
var comments=blog1.comment().all();
var comment1=comment[0];

blog1.comment().remove(comment1);

//or
blog1.comment().remove(comment1.id);
 */
    remove(nameOrId: any): void;
  }

}
declare namespace Kooboo.KContent.MutationTypes {
  interface Applications extends Kooboo.KContent.Types.Applications, Kooboo.KContent.contentTypeBase {
  }

  interface EcommerceKooboo extends Kooboo.KContent.Types.EcommerceKooboo, Kooboo.KContent.contentTypeBase {
  }

  interface JobBaseQuestion extends Kooboo.KContent.Types.JobQuestionItem, Kooboo.KContent.contentTypeBase {
  }

  interface Price extends Kooboo.KContent.Types.Price, Kooboo.KContent.contentTypeBase {
  }

  interface homeContent extends Kooboo.KContent.Types.homeContent, Kooboo.KContent.contentTypeBase {
  }

  interface ClientInfoBanner extends Kooboo.KContent.Types.ClientInfoBanner, Kooboo.KContent.contentTypeBase {
  }

  interface JobQuestion extends Kooboo.KContent.Types.JobItem, Kooboo.KContent.contentTypeBase {
  }

  interface EcommerceFeature extends Kooboo.KContent.Types.EcommerceFeature, Kooboo.KContent.contentTypeBase {
  }

  interface article extends Kooboo.KContent.Types.article, Kooboo.KContent.contentTypeBase {
  }

  interface Service extends Kooboo.KContent.Types.Service, Kooboo.KContent.contentTypeBase {
  }

  interface homeTabs extends Kooboo.KContent.Types.homeTabs, Kooboo.KContent.contentTypeBase {
  }

  interface PageAdvantage extends Kooboo.KContent.Types.PageAdvantage, Kooboo.KContent.contentTypeBase {
  }

  interface EcommerceShoplazza extends Kooboo.KContent.Types.EcommerceShoplazza, Kooboo.KContent.contentTypeBase {
  }

  interface category extends Kooboo.KContent.Types.category, Kooboo.KContent.contentTypeBase {
  }

  interface EcommerceContent extends Kooboo.KContent.Types.EcommerceContent, Kooboo.KContent.contentTypeBase {
  }

  interface aiPageCards extends Kooboo.KContent.Types.Applications, Kooboo.KContent.contentTypeBase {
  }

  interface advantage extends Kooboo.KContent.Types.products, Kooboo.KContent.contentTypeBase {
  }

  interface ClientInfoDocEntry extends Kooboo.KContent.Types.ClientInfoDocEntry, Kooboo.KContent.contentTypeBase {
  }

  interface JobQuestionItem extends Kooboo.KContent.Types.JobQuestionItem, Kooboo.KContent.contentTypeBase {
  }

  interface News extends Kooboo.KContent.Types.News, Kooboo.KContent.contentTypeBase {
  }

  interface HomeBanner extends Kooboo.KContent.Types.HomeBanner, Kooboo.KContent.contentTypeBase {
  }

  interface Favorite extends Kooboo.KContent.Types.Favorite, Kooboo.KContent.contentTypeBase {
  }

  interface EcommerceTitle extends Kooboo.KContent.Types.EcommerceTitle, Kooboo.KContent.contentTypeBase {
  }

  interface JobItem extends Kooboo.KContent.Types.JobItem, Kooboo.KContent.contentTypeBase {
  }

  interface EcommerceShopify extends Kooboo.KContent.Types.EcommerceShopify, Kooboo.KContent.contentTypeBase {
  }

  interface ListItem extends Kooboo.KContent.Types.ListItem, Kooboo.KContent.contentTypeBase {
  }

  interface PriceItem extends Kooboo.KContent.Types.PriceItem, Kooboo.KContent.contentTypeBase {
  }

  interface index_action extends Kooboo.KContent.Types.index_action, Kooboo.KContent.contentTypeBase {
  }

  interface ClientInfoUpdate extends Kooboo.KContent.Types.ClientInfoUpdate, Kooboo.KContent.contentTypeBase {
  }

  interface products extends Kooboo.KContent.Types.products, Kooboo.KContent.contentTypeBase {
  }

  interface Downloads extends Kooboo.KContent.Types.Downloads, Kooboo.KContent.contentTypeBase {
  }

  interface email extends Kooboo.KContent.Types.products, Kooboo.KContent.contentTypeBase {
  }

  interface Package extends Kooboo.KContent.Types.Package, Kooboo.KContent.contentTypeBase {
  }

}
declare namespace Kooboo.KContent.FolderTypes {
  interface Applications extends Kooboo.KContent.Types.Applications, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface EcommerceKooboo extends Kooboo.KContent.Types.EcommerceKooboo, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface JobBaseQuestion extends Kooboo.KContent.Types.JobQuestionItem, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface Price extends Kooboo.KContent.Types.Price, Required<Kooboo.KContent.contentTypeBase> {
    PriceItem: Kooboo.KContent.FolderTypes.PriceItem[];
    relatedContent: Kooboo.KContent.FolderTypes.Price.relatedContent;
  }

  interface homeContent extends Kooboo.KContent.Types.homeContent, Required<Kooboo.KContent.contentTypeBase> {
    homeTabs: Kooboo.KContent.FolderTypes.homeTabs[];
    relatedContent: Kooboo.KContent.FolderTypes.homeContent.relatedContent;
  }

  interface ClientInfoBanner extends Kooboo.KContent.Types.ClientInfoBanner, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface JobQuestion extends Kooboo.KContent.Types.JobItem, Required<Kooboo.KContent.contentTypeBase> {
    questions: Kooboo.KContent.FolderTypes.JobQuestionItem[];
    relatedContent: Kooboo.KContent.FolderTypes.JobQuestion.relatedContent;
  }

  interface EcommerceFeature extends Kooboo.KContent.Types.EcommerceFeature, Required<Kooboo.KContent.contentTypeBase> {
    EcommerceShopify: Kooboo.KContent.FolderTypes.EcommerceShopify[];
    EcommerceKooboo: Kooboo.KContent.FolderTypes.EcommerceKooboo[];
    EcommerceShoplazza: Kooboo.KContent.FolderTypes.EcommerceShoplazza[];
    relatedContent: Kooboo.KContent.FolderTypes.EcommerceFeature.relatedContent;
  }

  interface article extends Kooboo.KContent.Types.article, Required<Kooboo.KContent.contentTypeBase> {
    category: Kooboo.KContent.FolderTypes.category[];
    relatedContent: Kooboo.KContent.FolderTypes.article.relatedContent;
  }

  interface Service extends Kooboo.KContent.Types.Service, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface homeTabs extends Kooboo.KContent.Types.homeTabs, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface PageAdvantage extends Kooboo.KContent.Types.PageAdvantage, Required<Kooboo.KContent.contentTypeBase> {
    Items: Kooboo.KContent.FolderTypes.ListItem[];
    relatedContent: Kooboo.KContent.FolderTypes.PageAdvantage.relatedContent;
  }

  interface EcommerceShoplazza extends Kooboo.KContent.Types.EcommerceShoplazza, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface category extends Kooboo.KContent.Types.category, Required<Kooboo.KContent.contentTypeBase> {
    article: Kooboo.KContent.FolderTypes.article[];
    relatedContent: Kooboo.KContent.FolderTypes.category.relatedContent;
  }

  interface EcommerceContent extends Kooboo.KContent.Types.EcommerceContent, Required<Kooboo.KContent.contentTypeBase> {
    EcommerceFeature: Kooboo.KContent.FolderTypes.EcommerceFeature[];
    relatedContent: Kooboo.KContent.FolderTypes.EcommerceContent.relatedContent;
  }

  interface aiPageCards extends Kooboo.KContent.Types.Applications, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface advantage extends Kooboo.KContent.Types.products, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface ClientInfoDocEntry extends Kooboo.KContent.Types.ClientInfoDocEntry, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface JobQuestionItem extends Kooboo.KContent.Types.JobQuestionItem, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface News extends Kooboo.KContent.Types.News, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface HomeBanner extends Kooboo.KContent.Types.HomeBanner, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface Favorite extends Kooboo.KContent.Types.Favorite, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface EcommerceTitle extends Kooboo.KContent.Types.EcommerceTitle, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface JobItem extends Kooboo.KContent.Types.JobItem, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface EcommerceShopify extends Kooboo.KContent.Types.EcommerceShopify, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface ListItem extends Kooboo.KContent.Types.ListItem, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface PriceItem extends Kooboo.KContent.Types.PriceItem, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface index_action extends Kooboo.KContent.Types.index_action, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface ClientInfoUpdate extends Kooboo.KContent.Types.ClientInfoUpdate, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface products extends Kooboo.KContent.Types.products, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface Downloads extends Kooboo.KContent.Types.Downloads, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface email extends Kooboo.KContent.Types.products, Required<Kooboo.KContent.contentTypeBase> {
  }

  interface Package extends Kooboo.KContent.Types.Package, Required<Kooboo.KContent.contentTypeBase> {
  }

}
declare namespace Kooboo.KContent.FolderTypes.Price {
  interface relatedContent {
    PriceItem: Kooboo.KContent.RelationFolders.PriceItem;
  }

}
declare namespace Kooboo.KContent.FolderTypes.homeContent {
  interface relatedContent {
    homeTabs: Kooboo.KContent.RelationFolders.homeTabs;
  }

}
declare namespace Kooboo.KContent.FolderTypes.JobQuestion {
  interface relatedContent {
    questions: Kooboo.KContent.RelationFolders.JobQuestionItem;
  }

}
declare namespace Kooboo.KContent.FolderTypes.EcommerceFeature {
  interface relatedContent {
    EcommerceShopify: Kooboo.KContent.RelationFolders.EcommerceShopify;
    EcommerceKooboo: Kooboo.KContent.RelationFolders.EcommerceKooboo;
    EcommerceShoplazza: Kooboo.KContent.RelationFolders.EcommerceShoplazza;
  }

}
declare namespace Kooboo.KContent.FolderTypes.article {
  interface relatedContent {
    category: Kooboo.KContent.RelationFolders.category;
  }

}
declare namespace Kooboo.KContent.FolderTypes.PageAdvantage {
  interface relatedContent {
    Items: Kooboo.KContent.RelationFolders.ListItem;
  }

}
declare namespace Kooboo.KContent.FolderTypes.category {
  interface relatedContent {
    article: Kooboo.KContent.RelationFolders.article;
  }

}
declare namespace Kooboo.KContent.FolderTypes.EcommerceContent {
  interface relatedContent {
    EcommerceFeature: Kooboo.KContent.RelationFolders.EcommerceFeature;
  }

}
declare namespace Kooboo.KContent.Folders {
  interface Applications extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.Applications,Kooboo.KContent.MutationTypes.Applications> {
  }

  interface EcommerceKooboo extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.EcommerceKooboo,Kooboo.KContent.MutationTypes.EcommerceKooboo> {
  }

  interface JobBaseQuestion extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.JobBaseQuestion,Kooboo.KContent.MutationTypes.JobBaseQuestion> {
  }

  interface Price extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.Price,Kooboo.KContent.MutationTypes.Price> {
  }

  interface ClientInfoBanner extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.ClientInfoBanner,Kooboo.KContent.MutationTypes.ClientInfoBanner> {
  }

  interface JobQuestion extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.JobQuestion,Kooboo.KContent.MutationTypes.JobQuestion> {
  }

  interface EcommerceFeature extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.EcommerceFeature,Kooboo.KContent.MutationTypes.EcommerceFeature> {
  }

  interface article extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.article,Kooboo.KContent.MutationTypes.article> {
  }

  interface Service extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.Service,Kooboo.KContent.MutationTypes.Service> {
  }

  interface homeTabs extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.homeTabs,Kooboo.KContent.MutationTypes.homeTabs> {
  }

  interface PageAdvantage extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.PageAdvantage,Kooboo.KContent.MutationTypes.PageAdvantage> {
  }

  interface EcommerceShoplazza extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.EcommerceShoplazza,Kooboo.KContent.MutationTypes.EcommerceShoplazza> {
  }

  interface category extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.category,Kooboo.KContent.MutationTypes.category> {
  }

  interface EcommerceContent extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.EcommerceContent,Kooboo.KContent.MutationTypes.EcommerceContent> {
  }

  interface aiPageCards extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.aiPageCards,Kooboo.KContent.MutationTypes.aiPageCards> {
  }

  interface advantage extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.advantage,Kooboo.KContent.MutationTypes.advantage> {
  }

  interface ClientInfoDocEntry extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.ClientInfoDocEntry,Kooboo.KContent.MutationTypes.ClientInfoDocEntry> {
  }

  interface JobQuestionItem extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.JobQuestionItem,Kooboo.KContent.MutationTypes.JobQuestionItem> {
  }

  interface News extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.News,Kooboo.KContent.MutationTypes.News> {
  }

  interface HomeBanner extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.HomeBanner,Kooboo.KContent.MutationTypes.HomeBanner> {
  }

  interface Favorite extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.Favorite,Kooboo.KContent.MutationTypes.Favorite> {
  }

  interface EcommerceTitle extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.EcommerceTitle,Kooboo.KContent.MutationTypes.EcommerceTitle> {
  }

  interface JobItem extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.JobItem,Kooboo.KContent.MutationTypes.JobItem> {
  }

  interface EcommerceShopify extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.EcommerceShopify,Kooboo.KContent.MutationTypes.EcommerceShopify> {
  }

  interface ListItem extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.ListItem,Kooboo.KContent.MutationTypes.ListItem> {
  }

  interface PriceItem extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.PriceItem,Kooboo.KContent.MutationTypes.PriceItem> {
  }

  interface index_action extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.index_action,Kooboo.KContent.MutationTypes.index_action> {
  }

  interface ClientInfoUpdate extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.ClientInfoUpdate,Kooboo.KContent.MutationTypes.ClientInfoUpdate> {
  }

  interface products extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.products,Kooboo.KContent.MutationTypes.products> {
  }

  interface Downloads extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.Downloads,Kooboo.KContent.MutationTypes.Downloads> {
  }

  interface email extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.email,Kooboo.KContent.MutationTypes.email> {
  }

  interface Package extends Kooboo.KContent.folderBase<Kooboo.KContent.FolderTypes.Package,Kooboo.KContent.MutationTypes.Package> {
  }

}

declare namespace UserOptions {
  interface KParamConfig {
    /** Customer Service */
    customer_service: UserOptions.$customer_service;
  }

  interface $customer_service {
    /**  */
    url: string;
    /**  */
    id: string;
  }

}
declare namespace KScript {
  interface k {
    paramConfig: UserOptions.KParamConfig;
  }

}

declare namespace KScript.Commerce.Models {
  interface ProductDetail {
  }

  interface ProductSimple {
  }

  interface CategoryDetail {
  }

  interface CategorySimple {
  }

}

declare const k: KScript.k;;
declare namespace VueDefine {
    interface Component {
        data: () => object;
        props: Array<string> | object;
        computed: { [key: string]: Function | { get: Function; set: Function } };
        methods: { [key: string]: Function };
        watch: { [key: string]: string | Function | object | Array };
        emits: Array<string> | object;
        expose: Array<string>;
        render: Function;
        beforeCreate: Function;
        created: Function;
        beforeMount: Function;
        mounted: Function;
        beforeUpdate: Function;
        updated: Function;
        activated: Function;
        deactivated: Function;
        beforeUnmount: Function;
        unmounted: Function;
        errorCaptured: (err: Error, instance: Component, info: string) => ?boolean;
        directives: object;
        components: object;
        mixins: Array<object>;
        extends: object;
        provide: object | Function;
        inject: Array<string> | { [key: string]: string | Symbol | object };
        setup: Function;
        $data: object;
        $props: object;
        $el: any;
        $options: any;
        $parent: object;
        $root: object;
        $slots: object;
        $refs: object;
        $attrs: object;
        $watch(
            source: string | Function,
            callback: Function | Object,
            options?: { deep?: boolean; immediate?: boolean; flush?: string }
        ): Function;
        $emit: Function;
        $forceUpdate: Function;
        $nextTick(callback: Function): Promise<void>;
    }

    interface App {
        component(name: string, definition: Function | Component): object;
        config: object;
        directive(name: string, definition: Function | object): void;
        mixin: object;
        mount(rootContainer: Element | string, isHydrate: boolean): void;
        provide(key: string, value: any): App;
    }

    declare interface Vue {
        createApp(rootComponent: Component, props?: object): App;
        h(type: string, props: object, children: String | Array | object): any;
        defineComponent(definition: Component | Function): Component;
        defineCustomElement(definition: Component | Function): HTMLElement;
        resolveDynamicComponent(component: String | object): Component;
        nextTick(callback: Function): Promise<void>;
        version: string;
    }
}

declare const Vue: VueDefine.Vue;
