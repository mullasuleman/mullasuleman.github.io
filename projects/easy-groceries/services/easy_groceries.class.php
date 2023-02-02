<?php

// require_once("inc/connect_pdo.php");
date_default_timezone_set('America/Toronto');

class EasyGroceries
{

	public $dbo = "";

	// define constructor
	public function __construct()
	{
		require_once("inc/connect_pdo.php");
		$this->dbo = $dbo;
	}

	// function to get list of departments
	public function getDepartments()
	{
		$errorCode = 0;
		$errorMessage = "";

		try {
			$query = "SELECT id, name, c_image
			FROM ea_category
			ORDER BY name ";

			foreach ($this->dbo->query($query) as $row) {
				$id = stripslashes($row[0]);
				$name = stripslashes($row[1]);
				$c_image = stripslashes($row[2]);
				$department["id"] = $id;
				$department["name"] = $name;
				$department["c_image"] = $c_image;

				$departments[] = $department;
			}
		} catch (PDOException $e) {
			$errorCode = -1;
			$errorMessage = "PDOException for getDepartments" . $e;
		}

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["departments"] = $departments;
		$data["query"] = $query;

		$data = json_encode($data);
		return $data;
	}

	// function to get the path of the product image
	public function getImagePath($upc)
	{
		$query = "SELECT file
		from ea_images
		WHERE upc = '$upc' ";

		foreach ($this->dbo->query($query) as $row) {
			$file = stripslashes($row[0]);
			$folder = substr($upc, 0, 4);
			$path = "./uploads/$folder/$file";
		}
		return $path;
	}

	// function to get list of products by department
	public function getProductsByDepartment($department_id)
	{
		$errorCode = 0;
		$errorMessage = "";

		try {
			// WHERE STATEMENT HAS A STRAIGHT JOIN
			$query = "SELECT ea_product.id, upc, brand, product_name, product_description, avg_price, ea_category.name
			FROM ea_product, ea_category
			WHERE ea_product.category_id = ea_category.id
			AND category_id = '$department_id'
			ORDER BY avg_price ";

			foreach ($this->dbo->query($query) as $row) {
				$id = stripslashes($row[0]);
				$upc = strval(stripslashes($row[1]));
				$brand = stripslashes($row[2]);
				$product_name = stripslashes($row[3]);
				$product_description = stripslashes($row[4]);
				$avg_price = stripslashes($row[5]);
				$department_name = stripslashes($row[6]);

				$product["id"] = $id;
				$product["upc"] = $upc;
				$product["brand"] = $brand;
				$product["product_name"] = $product_name;
				$product["product_description"] = $product_description;
				$product["avg_price"] = $avg_price;
				$product["department_name"] = $department_name;
				$product["image_path"] = $this->getImagePath($upc);

				// used for searching or displaying the title of the page
				$data["department_search"] = $department_name;

				$products[] = $product;
			}
		} catch (PDOException $e) {
			$errorCode = -1;
			$errorMessage = "PDOException for getProductsByDepartments" . $e;
		}

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["products"] = $products;
		$data["query"] = $query;

		$data = json_encode($data);
		return $data;
	}

	// function to get list of products by search
	public function getProductsBySearch($search)
	{

		// using explode to break up a word into array at each space
		$words = explode(' ', trim($search));
		// using implode to combine the string array $words using the PIPE | operator and generate a regex pattern
		$regex = implode('|', $words);
		$errorCode = 0;
		$errorMessage = "";

		if (!empty($search)) {

			try {
				// Combining multiple where statements using AND and OR
				// Using REGEXP to search on multiple fields for patterns
				$query = "SELECT ea_product.id, upc, brand, product_name, product_description, avg_price, ea_category.name
				FROM ea_product, ea_category
				WHERE ea_product.category_id = ea_category.id
				AND ( upc REGEXP '{$regex}'
				OR brand REGEXP '{$regex}'
				OR ea_category.name REGEXP '{$regex}'
				OR product_name REGEXP '{$regex}' )
				ORDER BY avg_price ";

				foreach ($this->dbo->query($query) as $row) {
					$id = stripslashes($row[0]);
					$upc = strval(stripslashes($row[1]));
					$brand = stripslashes($row[2]);
					$product_name = stripslashes($row[3]);
					$product_description = stripslashes($row[4]);
					$avg_price = stripslashes($row[5]);
					$department_name = stripslashes($row[6]);

					$product["id"] = $id;
					$product["upc"] = $upc;
					$product["brand"] = $brand;
					$product["product_name"] = $product_name;
					$product["product_description"] = $product_description;
					$product["avg_price"] = $avg_price;
					$product["department_name"] = $department_name;
					$product["image_path"] = $this->getImagePath($upc);

					$products[] = $product;
				}
			} catch (PDOException $e) {
				$errorCode = -1;
				$errorMessage = "PDOException for getProductsBySearch" . $e;
			}
		} else {
			$errorCode = -2;
			$errorMessage = "PDOException for no search data" . $e;
		}

		// used for searching or displaying the title of the page
		$data["department_search"] = $search;

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["products"] = $products;
		$data["query"] = $query;

		$data = json_encode($data);
		return $data;
	}

	public function convertFancyQuotes($str)
	{
		return str_replace(array(chr(145), chr(146), chr(147), chr(148), chr(151)), array("'", "'", '"', '"', '-'), $str);
	}

	// function to get list of products in the cart
	public function getProductsByCart($json)
	{

		$errorCode = 0;
		$errorMessage = "";


		try {

			$cart_array = json_decode($json);
			//var_dump($cart_array);
			$list = "";
			$cart = array();
			foreach ($cart_array as $key => $value) {
				if ($list == "") {
					$list = "$key";
				} else {
					$list .= ",$key";
				}
				$cart[$key] = $value;
			}

			$query = "SELECT ea_product.id, upc, brand, product_name, 
            product_description, avg_price, ea_category.name, unit.name AS unit
			FROM ea_product, ea_category, unit
            WHERE ea_product.category_id = ea_category.id
            AND ea_product.id IN ($list)
			AND ea_product.unit = unit.unit_id
			ORDER BY avg_price";
			//print("$query");
			foreach ($this->dbo->query($query) as $row) {
				$id = stripslashes($row[0]);
				$upc = strval(stripslashes($row[1]));
				$brand = $this->convertFancyQuotes(stripslashes($row[2]));
				$product_name = $this->convertFancyQuotes(stripslashes($row[3]));
				$product_description = $this->convertFancyQuotes(stripslashes($row[4]));
				$avg_price = stripslashes($row[5]);
				$category_name = $this->convertFancyQuotes(stripslashes($row[6]));
				$unit = $this->convertFancyQuotes(stripslashes($row[7]));

				$product["id"] = $id;
				$product["upc"] = $upc;
				$product["brand"] = $brand;
				$product["product_name"] = $product_name;
				$product["product_description"] = $product_description;
				$product["avg_price"] = $avg_price;
				$product["category_name"] = $category_name;
				$product["quantity"] = "$cart[$id]";
				//
				$product["unit"] = $unit;
				$product["image_path"] = $this->getImagePath($upc);

				$products[] = $product;
			}
		} catch (PDOException $e) {
			$this->errorCode = 1;
			$errorCode = -1;
			$errorMessage = "PDOException for getProductsByCategory.";
		}

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["search"] = $category_name;
		$data["query"] = $query;

		$data["products"] = $products;

		$data = json_encode($data);

		return $data;
	}

	// creates two random identifier/letters to associate with any individual who is signing up
	public function createSalt()
	{
		srand(time());
		$pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for ($index = 0; $index < 2; $index++) {
			$sid .= substr($pool, (rand() % (strlen($pool))), 1);
		}
		return $sid;
	}

	// encrypting the password with the generated salt using md5
	// returns a 32 character string based on any string generation
	public function encryptPassword($password, $salt)
	{
		for ($x = 1; $x <= 10; ++$x) {
			$password = md5($password . $salt);
		}
		return $password;
	}

	public function loginAccount($username, $password)
	{
		$errorCode = 0;
		$errorMessage = "";
		$data["ea_user_id"] = -1;

		if (!empty($username)) {
			try {
				// get salt
				$query = "SELECT salt
                FROM ea_user
                WHERE email = '$username' ";
				//print("$query");
				foreach ($this->dbo->query($query) as $row) {
					$salt = stripslashes($row[0]);
				}

				// encrypt password
				$encrpted = $this->encryptPassword($password, $salt);

				// get account info or
				$x = false;
				$query = "SELECT ea_user_id,
				billing_name_first,
				billing_name_last,
				billing_address,
				billing_city,
				billing_province,
				billing_postal_code,
				shipping_name_first,
				shipping_name_last,
				shipping_address,
				shipping_city,
				shipping_province,
				shipping_postal_code
                FROM ea_user
                WHERE email = '$username'
                AND password = '$encrpted' ";
				//print("$query");
				foreach ($this->dbo->query($query) as $row) {
					$ea_user_id = stripslashes($row[0]);
					$billing_name_first = stripslashes($row[1]);
					$billing_name_last = stripslashes($row[2]);
					$billing_address = stripslashes($row[3]);
					$billing_city = stripslashes($row[4]);
					$billing_province = stripslashes($row[5]);
					$billing_postal_code = stripslashes($row[6]);
					$shipping_name_first = stripslashes($row[7]);
					$shipping_name_last = stripslashes($row[8]);
					$shipping_address = stripslashes($row[9]);
					$shipping_city = stripslashes($row[10]);
					$shipping_province = stripslashes($row[11]);
					$shipping_postal_code = stripslashes($row[12]);
					$x = true;

					$data["ea_user_id"] = $ea_user_id;
					$data["billing_name_first"] = $billing_name_first;
					$data["billing_name_last"] = $billing_name_last;
					$data["billing_address"] = $billing_address;
					$data["billing_city"] = $billing_city;
					$data["billing_province"] = $billing_province;
					$data["billing_postal_code"] = $billing_postal_code;
					$data["shipping_name_first"] = $shipping_name_first;
					$data["shipping_name_last"] = $shipping_name_last;
					$data["shipping_address"] = $shipping_address;
					$data["shipping_city"] = $shipping_city;
					$data["shipping_province"] = $shipping_province;
					$data["shipping_postal_code"] = $shipping_postal_code;
					$data["email"] = $username;
				}

				// return error
				if (!$x) {
					$errorCode = 200;
					$errorMessage = "Your email and password do not match!";
				}
			} catch (PDOException $e) {
				$this->errorCode = 1;
				$errorCode = -1;
				$errorMessage = "PDOException for login.";
			}
		} else {
			$errorCode = 1;
			$errorMessage = "No username.";
		}

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["search"] = $search;
		$data["query"] = $query;

		$data["products"] = $products;

		$data = json_encode($data);

		return $data;
	}

	public function createAccount($username, $password, $name_first, $name_last)
	{
		// create salt
		$salt = $this->createSalt();
		// encrypt password
		$encrpted = $this->encryptPassword($password, $salt);
		// create record with name
		$errorCode = 0;
		$errorMessage = "";
		$user_id = -1;
		if (!empty($username)) {
			try {
				$query = "INSERT INTO ea_user
                SET email = '$username',
                password = '$encrpted',
                salt = '$salt',
                billing_name_first = '$name_first' ,
                billing_name_last = '$name_last',
                sign_up_date = NOW() ";
				//print("$query");
				$this->dbo->query($query);
				// lastInsertId() returns the id of the last inserted record
				$user_id = $this->dbo->lastInsertId();

				// return id
			} catch (PDOException $e) {
				$errorCode = -1;
				$errorMessage = "PDOException for createAccount.";
			}
		} else {
			$errorCode = 1;
			$errorMessage = "No Username.";
		}

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["user_id"] = $user_id;
		$data["query"] = $query;

		$data = json_encode($data);

		return $data;
	}

	// !new methods for payment and creating invoice

	public function getPrice($key)
	{
		$query = "SELECT avg_price
			FROM ea_product
			WHERE id = '$key' ";
		//print("$query");
		foreach ($this->dbo->query($query) as $row) {
			$avg_price = stripslashes($row[0]);
		}

		return $avg_price;
	}

	public function makePayment()
	{

		// sent to bank for verification and transaction code

		srand(time());
		$pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#%&";
		for ($index = 0; $index < 20; $index++) {
			$sid .= substr($pool, (rand() % (strlen($pool))), 1);
		}

		$errorCode = 0;
		$errorMessage = "";

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["transaction_code"] = $sid;

		$data = json_encode($data);

		return $data;
	}



	// STEP 5

	// Create invoice and add items to table

	public function makeInvoice($transaction_code, $myCart, $ea_user_id, $billing_name_last, $billing_name_first)
	{


		// create record with name
		$errorCode = 0;
		$errorMessage = "";

		if (!empty($transaction_code)) {

			try {

				//$billing_name_last = addslashes($billing["billing_name_last"]);
				//$billing_name_first = addslashes($billing["billing_name_first"]);

				// create invoice
				$query = "INSERT INTO ea_invoice
					SET ea_user_id = '$ea_user_id',
					transaction_code = '$transaction_code',
					billing_name_last = '$billing_name_last',
					billing_name_first = '$billing_name_first',
					process_date = NOW() ";
				//print("$query\n");
				$this->dbo->query($query);
				$invoice_id = $this->dbo->lastInsertId();

				$data["insert_query"] = $query;


				// add items to invoice
				$x = 1;
				foreach ($myCart as $key => $value) {
					$avg_price = $this->getPrice($key);

					$query = "INSERT INTO ea_item
						SET ea_invoice_id = '$invoice_id',
						ea_product_id = '$key',
						quantity = '$value',
						avg_price = '$avg_price',
						order_me = '$x' ";
					//print("$query\n");
					$this->dbo->query($query);
					++$x;
				}

				// send email
				// grab the id of the invoice and then pull data from the database
				// format the data as needed and send email
				// $this->sendInvoice($invoice_id);

				// return id
			} catch (PDOException $e) {
				$errorCode = -1;
				$errorMessage = "PDOException for createAccount.";
			}
		} else {
			$errorCode = 1;
			$errorMessage = "No Username.";
		}

		$error["id"] = $errorCode;
		$error["message"] = $errorMessage;

		$data["error"] = $error;

		$data["invoice_id"] = $invoice_id;
		$data["query"] = $query;

		// send email

		$data = json_encode($data);

		return $data;
	}
}

?>