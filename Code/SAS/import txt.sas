libname datme "D:\Dropbox\1 Data Bootcamp\Machine Learning Project";

libname datme "E:\Machine Learning Project";


proc import datafile= "D:\Dropbox\1 Data Bootcamp\Machine Learning Project\building.txt"
out= datme.build
 dbms = dlm
 replace;
 delimiter = '09'x;
run;

data datme.build;
set datme.build;
drop var23-var26;
run;

proc import datafile= "E:\Machine Learning Project\all_energy_consumption.txt"
out= datme.econsume
 dbms = dlm
 replace;
 delimiter = '09'x;
run;


data ml.econsume; 
set ml.econsume_copy;
run;

proc import datafile= "E:\Machine Learning Project\econsume_country.txt"
out= datme.econsume_country
 dbms = dlm
 replace;
 delimiter = '09'x;
run;
data ml.econsume_country_copy; 
set ml.econsume_country;
run;

data consume.econsume;
set consume.econsume;
format date YEAR4.  ;
run;
data consume.econsume2;
set consume.econsume2;
format date2 YEAR4.  ;
run;
