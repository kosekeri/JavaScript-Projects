var x = true;

document.write(typeof x);
document.write("<br>");

document.write("10" + 10);
document.write("<br>");

document.write(5 == 5);
document.write("<br>");

x = 1;
y = 1;
document.write(x === y);
document.write("<br>");

document.write(10 > 5 || 11 > 6);
document.write("<br>");

document.write(10 < 5 || 11 < 6);
document.write("<br>");

function not_Function() {
    document.getElementById("Not").innerHTML = !(1 > 2);
}
