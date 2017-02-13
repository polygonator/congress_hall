<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class New_class extends CI_Controller {

	public function index()
	{
		$this->load->view('hello_view');
	}
    
    function data_base()
    {
        $DB = $this->load->database();
            
        $query = $this->db->query('SELECT * FROM articles');
        
        foreach ($query->result() as $row)
        {
            echo $row->title.'&nbsp';
            echo $row->subject.'&nbsp';
            echo $row->text_length.'&nbsp';
            echo $row->date.'&nbsp';
            echo $row->id.'&nbsp';
        }
        
    }
    
    function cnt()
    {
        echo 'Number of rows in articles: '. $this->db->count_all('articles');
    }
    
    function ins_data()
    {
        $DB = $this->load->database();
        
        $data = array('title'=>'title_2', 'subject'=>'subject_2', 'text_length'=>150, 'date'=>'2017-02-09', 'id'=>2);
        $this->db->insert('articles', $data);
        echo 'Inserted successfuly!';
    }
    
    function call()
    {
        $this->load->model('articles_model');
    }
    
    function del()
    {
        $this->db->delete('articles', array('id'=>2));  
    }
    
    function reg()
    {
        echo 'Your datas: <br>';
        echo 'Login: ' . $_POST['login'] . '<br>';
        echo 'E-mail: ' . $_POST['email'] . '<br>';
        echo 'Password: ' . $_POST['password'] . '<br>';
    
        $this->load->database();
        $data = array('nickname'=>$_POST['login'], 'email'=>$_POST['email'], 'password'=>$_POST['password']);
        $this->db->insert('users', $data);
    }

}
