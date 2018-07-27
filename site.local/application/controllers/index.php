<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Index extends CI_Controller {
    
    function indx()
    {  
        $this->load->view('cap_page');
        $this->load->view('index_page');
        $this->load->view('basement_page');
    }

}
