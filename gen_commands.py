from random import sample

tab_names = ["font", "paragraph", "insert", "drawing", "symbols"]

NUM_COMMANDS_PER_TAB = 12
command_ids = range(NUM_COMMANDS_PER_TAB)

def gen_commands(num_sets=3):
	tabs = sample(tab_names, 3)
	print "TABS: %s" % tabs

	for i in range(num_sets):
		print "\nSET %d: " % i 
		for tab in tabs:
			print "%s : %s" % (tab, sample(command_ids, 2))
	print ""

if __name__ == "__main__":
	gen_commands()
