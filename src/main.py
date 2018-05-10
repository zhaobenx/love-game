# -*- coding: utf-8 -*-
"""
Created on 2018-05-10 18:57:57
@Author: ZHAO Lingfeng
@Version : 0.0.1
"""


import yaml
import jinja2


def parser(file_name):
    plot = yaml.load(open(file_name, 'r', encoding='utf-8'))
    return plot


def generate_HTML(plot):

    templateLoader = jinja2.FileSystemLoader(searchpath="./")
    templateEnv = jinja2.Environment(loader=templateLoader)
    TEMPLATE_FILE = "template.html"
    template = templateEnv.get_template(TEMPLATE_FILE)

    for scene in plot:
        title = scene

        image = plot[scene].get('image')
        dialogue = plot[scene].get('dialogue')
        choices = []

        for i in plot[scene].get('choices', []):
            # print(i)
            choice = {}
            name, path = i.popitem()
            choice['path'] = path + '.html'
            choice['name'] = name
            choices.append(choice)

        content = template.render(title=title, image=image, dialogue=dialogue, choices=choices)
        save(title, content)

def save(filename, content):
    filename = './docs/' + filename + '.html'
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    plot = parser('plot.yaml')
    generate_HTML(plot)
    print("Done")
    pass


if __name__ == "__main__":
    main()
