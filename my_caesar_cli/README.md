
# Caesar cipher CLI tool

CLI tool should accept 4 options:

1.  **-s, --shift**: a shift, obligatory
2.  **-i, --input**: an input file, otional, if skipped input comes from terminal
3.  **-o, --output**: an output file, otional, if skipped output goes to terminal
4.  **-a, --action**: an action encode/decode, obligatory

**Usage example:**

Go to my_caesar_cli subderictory by ***cd my_caesar_cli***
or use ***node my_caesar_cli/cd my_caesar_cli*** to run

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```