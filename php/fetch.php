<?php  
include "config.php";

$data = json_decode(file_get_contents('php://input'), true);

if($data == 'parts')
{
	$stmt1 = 'SELECT Status, COUNT(Status) as count FROM nithy GROUP BY Status';
	//$stmt1='SELECT Status, count FROM (SELECT approved_rejected as Status, count(approved_rejected) as count FROM nithy WHERE approved_rejected = 'Approver 5' union SELECT Status, count(Status) as count FROM nithy GROUP BY Status) as total'

	if ($result = mysqli_query($conn,$stmt1)) {
	  while($data = mysqli_fetch_array($result))
	  {
	   	$out[] = array(
	   		"Status" => $data['Status'],
	   		"Count" => (int)$data['count']
	   	);
	  }
	  echo json_encode($out);
	}
	else
	{
	echo json_encode($stmt1); 
	}
}

if($data == 'engineer')
{
	$stmt1 = 'SELECT created_by, COUNT(created_by) as count FROM nithy GROUP BY created_by';

	if ($result = mysqli_query($conn,$stmt1)) {
	  while($data = mysqli_fetch_array($result))
	  {
	   	$out[] = array(
	   		"Creator" => $data['created_by'],
	   		"Count" => (int)$data['count']
	   	);
	  }
	  echo json_encode($out);
	}
	else
	{
	echo json_encode($stmt1); 
	}
}

if($data == 'approver')
{
	$stmt1 = 'SELECT approved_rejected,COUNT(approved_rejected) as count FROM nithy GROUP BY approved_rejected';

	if ($result = mysqli_query($conn,$stmt1)) {
	  while($data = mysqli_fetch_array($result))
	  {
	   	$out[] = array(
	   		"Approver" => $data['approved_rejected'],
	   		"Count" => (int)$data['count']
	   	);
	  }
	  echo json_encode($out);
	}
	else
	{
	echo json_encode($stmt1); 
	}
}

if($data == 'dashboard')
{
	$stmt1 = 'SELECT COUNT(part_number) as parts, count(DISTINCT created_by) as creators, count(DISTINCT approved_rejected) as approvers, count(DISTINCT Mat_category) as cats FROM nithy';

	if ($result = mysqli_query($conn,$stmt1)) {
	  if($data = mysqli_fetch_array($result))
	  {
	   	$out[] = array(
	   		"Part_count" => $data['parts'],
	   		"Creator_count" => $data['creators'],
	   		"Approver_count" => $data['approvers'],
	   		"Category_count" => $data['cats']
	   	);
	  }
	  echo json_encode($out);
	}
	else
	{
	echo json_encode($stmt1); 
	}
}

if($data == 'category')
{
	$stmt1 = 'SELECT Mat_category, COUNT(Mat_category) as count FROM nithy GROUP BY Mat_category';

	if ($result = mysqli_query($conn,$stmt1)) {
	  while($data = mysqli_fetch_array($result))
	  {

	   	$out[] = array(
	   		"Category" => $data['Mat_category'],
	   		"Count" => $data['count'],
	   	);
	  }
	  echo json_encode($out);
	}
	else
	{
	echo json_encode($stmt1); 
	}
}
?>