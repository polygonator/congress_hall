<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class About_us extends CI_Controller {
    
    function ab_us()
    {  
        $this->load->view('cap_page');
        $this->load->view('About_us_page');
        $this->load->view('basement_page');
    }

}
