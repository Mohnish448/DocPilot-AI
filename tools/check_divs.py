from pathlib import Path
p=Path('app/page.js')
text=p.read_text(encoding='utf-8')
lines=text.splitlines()
stack=[]
import sys
for i,l in enumerate(lines,1):
    ocount=l.count('<div')
    ccount=l.count('</div>')
    for _ in range(ocount):
        stack.append((i,l.strip()))
    for _ in range(ccount):
        if stack:
            stack.pop()
        else:
            print('Extra closing at', i)

print('Remaining unclosed divs:', len(stack))
for tup in stack:
    print('Line', tup[0], '->', tup[1][:120])
