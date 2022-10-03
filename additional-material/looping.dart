void main() {
  for (int i = 1; i <= 5; i++) {
    print(i);
  }

  print("====================");

  int counter = 1;
  while (counter <= 5) {
    print("Angka ke-$counter");

    counter++;
  }

  print("====================");

  int init = 0;
  do {
    print("Do($init)");

    init++;
  } while (init < 10);

  print("====================");
  print("For loop through colors");

  List<String> colors = ["Cyan", "Magenta", "Yellow", "Kcolor"];

  for (int j = 0; j < colors.length; j++) {
    print("Colors: ${colors[j]}");
  }

  print("====================");
  print("ForEach through cats name");

  List<String> cats = ["Asep", "Jambul", "Garfield"];
  cats.forEach((value) => print("Nama kucing: $value"));

  print("====================");
  print("For...in sacred numbers");

  List<int> sacredNumbers = [666, 1945, 13];

  for (int num in sacredNumbers) {
    print("Sacred numbers: $num");
  }
}
