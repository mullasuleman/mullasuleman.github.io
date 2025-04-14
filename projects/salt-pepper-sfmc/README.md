![Salt&Pepper for SFMC](images/sp-icon-128.png)
# What is Salt & Pepper for SFMC?
Salt & Pepper for SFMC is a browser extension that adds utilities to Salesforce Marketing Cloud Engagement (SFMC) and Marketing Cloud Account Engagement (MCAE, Pardot).

# Tools
### SFMC-E > Email Studio > Data Extensions
- __Download Data Extension Schema__
  - Downloads a CSV file that includes DE Path, Name, External Key, Fields, Field Type, Field Length, Primary Key, Nullable, and Default Value
  - Sample CSV: [Sample_File_DE_Schema.csv](Sample_File_DE_Schema.csv)
- __Download Blank CSV with Data Extension fields as headers__
  - Sometimes you just want to quickly import some records into a DE but you have to create a csv file form scratch and add DE fields manually. Use this to download a blank csv with all DE headers, populate with data and import.
  - Use as a sample file for field mapping when setting up an import activity in Automation Studio
  - Use as a sample file for field mapping when setting up an import definition in Contact Builder
  - Sample CSV: [Sample_File_DE_Blank.csv](Sample_File_DE_Blank.csv)
- __Copy SQL (all fields)__
  - Copies an SQL query to the clipboard for the data extension that's currently open.

### SFMC-E > Query Studio 
- __Select/Copy fields from Data Extension Search results__
  - Use the existing Object Explorer tool available in Query Studio to search for a Data Extension.
  - Once a Data Extension is selected, this extension will add a checkbox to each field and add a copy button.
  - Select and copy fields to use in the query.
- __View/Select/Copy Data View Attributes with alias of your choice__
  - This adds a new Data Views expandable section under the Query editor.
  - Explore each data view, select and copy fields from each data view.
  - Use the Copy All button to copy fields selected across different data views.
  - Copied fields will include an alias. For instance `_Click.EventDate` or `_Sent.EventDate`. No need to manually add aliases to differentiate the fields.
  - Set a custom alias for each data view as per your liking. For instance, `c.EventDate` for _Click data view and `s.EventDate` for _Sent data view.
- __Query Type Assist (Code suggestion) - BETA__
  - Data view type assist provides code suggestions as you type. It suggests data views as well as attributes. 
  - If a custom alias is defined for any data view, code suggestion will use that alias.

### Account Engagement > Settings 
- __Download Salesforce fields available for sync on Prospect, Account, and Opportunity objects__
  - When adding a new custom field, a download icon will appear next to the sync/refresh icon. This will download all Salesforce.com fields currently available to sync with the Prospect, Account, or Opportunity Parodot/MCAE field.
- __CSV Export for Prospect fields__
  - While viewing Prospect Fields, a "CVS Export" button will be added next to the "Add Custom Field" button. This will download a CSV containing all default and custom Prosect fields (including field name, API name, CRM field name, type, and last updated date)

#### Downloads
[![Available in the Chrome Web Store](https://developer.chrome.com/static/docs/webstore/branding/image/iNEddTyWiMfLSwFD6qGq.png 'Available in the Chrome Web Store')](https://chromewebstore.google.com/detail/salt-pepper-for-sfmc/kaepngbmnmbbaihkldlepffifhjgkefn)

[![FireFox - Get the Add-on](https://extensionworkshop.com/assets/img/documentation/publish/get-the-addon-178x60px.dad84b42.png 'FireFox - Get the Add-on')](https://addons.mozilla.org/en-US/firefox/addon/salt-pepper-for-sfmc/)

#### Privacy Disclaimer
This extension does not collect, store or transfer any data locally or to any external platform.
