<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'creat957_hc_pro' );

/** MySQL database username */
define( 'DB_USER', 'creat957_hc_pro' );

/** MySQL database password */
define( 'DB_PASSWORD', 'S014@1)8pd' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'uc20wicnletefq9jyzqqqmcmdgxdzbduqntdhshg2uzogwxo4qk4zuyt83ilm0cl' );
define( 'SECURE_AUTH_KEY',  'n1jjcjgg2kwwyninigalcsxpvwlteudjck38yfxalhkt9ilbgtbjgny4mekbcs67' );
define( 'LOGGED_IN_KEY',    'q1s3cq3fniq1osz59v0fde1ecmwwl9lxsxtojuijvps1rh8iir1wdjfvlhysgimf' );
define( 'NONCE_KEY',        'xbd4jsdij15yu4zsgsgmcsg5tchpjsnbb2qssnwti1c5qifkxy4f6qtoibxl6goj' );
define( 'AUTH_SALT',        'vfdfcag2wpgaxg6cxutng4aisrgjsgddbvmk5w6qmmnttkusqbzuriyqnrblxfyt' );
define( 'SECURE_AUTH_SALT', 'lptrtdeire2afegkpbkcjfqty3dy3edtzxj7wvn3iqtdqj4ylg36yjfywgvnftyd' );
define( 'LOGGED_IN_SALT',   'tnhqhrrhs0rcppctsemdgt4qqewgclsviwskwavprrkjmnorjjuqyogwfmawxqat' );
define( 'NONCE_SALT',       'xib5gmw8ioowbf2hp6ibak40cbmdrg2r7vljmtoty2vjffymfgy4slvih7roikzu' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpxm_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
