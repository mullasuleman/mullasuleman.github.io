<?php

/**
 * Change number of products that are displayed per page (shop page)
 */

function holy_cupcakes_shop_per_page($cols)
{
    // $cols contains the current number of products per page based on the value stored on Options -> Reading
    // Return the number of products you wanna show per page.
    $cols = 9;
    return $cols;
}

add_filter('loop_shop_per_page', 'holy_cupcakes_shop_per_page', 20);

/**
 * Change number or products per row to 3
 */

if (!function_exists('loop_columns')) {
    function loop_columns()
    {
        return 3; // 3 products per row
    }
}
add_filter('loop_shop_columns', 'loop_columns', 999);

// disable default woocommerce style
//add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );


/**
 * Display Sale Price Before Regular Price
 */

if (!function_exists('holy_cupcakes_price_display')) {

    function holy_cupcakes_price_display($price_amt, $regular_price, $sale_price)
    {
        $html_price = '<p class="price">';
        if (($price_amt == $sale_price) && ($sale_price != 0)) {
            $html_price .= '<ins>' . woocommerce_price($sale_price) . '</ins>';
            $html_price .= '<del>' . woocommerce_price($regular_price) . '</del>';
        } else {
            $html_price .= '<ins>' . woocommerce_price($regular_price) . '</ins>';
        }
        $html_price .= '</p>';
        return $html_price;
    }
}

function holy_cupcakes_simple_product_price_html($price, $product)
{
    if ($product->is_type('simple')) {
        $regular_price = $product->regular_price;
        $sale_price = $product->sale_price;
        $price_amt = $product->price;
        return holy_cupcakes_price_display($price_amt, $regular_price, $sale_price);
    }
}
add_filter('woocommerce_get_price_html', 'holy_cupcakes_simple_product_price_html', 100, 2);
