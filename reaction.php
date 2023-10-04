<?php
// $conn = new mysqli("localhost", "username", "password", "db_name");
$conn = new mysqli("localhost", "bhjuxcle_ndh", "H0@ng12345", "bhjuxcle_ndh");
$key = isset($_GET["key"]) ? $_GET["key"] : null;
$r1 = isset($_GET["r1"]) ? $_GET["r1"] : null;
$r2 = isset($_GET["r2"]) ? $_GET["r2"] : null;
$r3 = isset($_GET["r3"]) ? $_GET["r3"] : null;
$r4 = isset($_GET["r4"]) ? $_GET["r4"] : null;
$r5 = isset($_GET["r5"]) ? $_GET["r5"] : null;
if ($key !== null) {
    $sql = "SELECT * FROM `reactionbyNDH` WHERE `key` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $key);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($r1 !== null) {
            $row["r1"] += 1;
        }
        if ($r2 !== null) {
            $row["r2"] += 1;
        }
        if ($r3 !== null) {
            $row["r3"] += 1;
        }
        if ($r4 !== null) {
            $row["r4"] += 1;
        }
        if ($r5 !== null) {
            $row["r5"] += 1;
        }
        $updateSql = "UPDATE `reactionbyNDH` SET `r1` = ?, `r2` = ?, `r3` = ?, `r4` = ?, `r5` = ? WHERE `key` = ?";
        $stmt = $conn->prepare($updateSql);
        $stmt->bind_param("iiisss", $row["r1"], $row["r2"], $row["r3"], $row["r4"], $row["r5"], $key);
        $stmt->execute();
        $response = ["r1" => $row["r1"], "r2" => $row["r2"], "r3" => $row["r3"], "r4" => $row["r4"], "r5" => $row["r5"]];
        echo json_encode($response);
    } else {
        $sql = "INSERT INTO `reactionbyNDH` (`key`, `r1`, `r2`, `r3`, `r4`, `r5`) VALUES (?, 0, 0, 0, 0, 0)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $key);
        $stmt->execute();
        $response = ["r1" => 0, "r2" => 0, "r3" => 0, "r4" => 0, "r5" => 0];
        echo json_encode($response);
    }
}
$conn->close();
?>

<!-- cấu hình file .htaccess
Header set Access-Control-Allow-Origin "https://www.h2.io.vn"

cấu hình DB

CREATE TABLE `reactionbyNDH` (
    `key` VARCHAR(255) NOT NULL PRIMARY KEY,
    `r1` INT NOT NULL,
    `r2` INT NOT NULL,
    `r3` INT NOT NULL,
    `r4` INT NOT NULL,
    `r5` INT NOT NULL
);
-->
