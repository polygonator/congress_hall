<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pass_check extends CI_Controller {
    
    function ps_ch()
    {  
        $this->load->view('cap_page');
        $this->load->view('pass_check_page');
        $this->load->view('basement_page');
    }
    
    function check()
    {
        $thiis->load->model('pass_check_model');
        $key = $this->pass_check_model->pe_check();
    }
}